import React, { useState, useRef } from 'react';
import { JobPosting } from '../types';

interface ApplyModalProps {
  job: JobPosting | null;
  onClose: () => void;
  onSubmitApplication: (appData: {
    candidateName: string;
    email: string;
    position: string;
    portfolioUrl: string;
    coverLetter: string;
    resumeName?: string;
    resumeUrl?: string;
    experienceSummary?: Array<{
      role: string;
      company: string;
      period: string;
      description?: string;
    }>;
  }) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, onClose, onSubmitApplication }) => {
  const [candidateName, setCandidateName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<{ name: string; size: string; url: string } | null>(null);
  const [experiences, setExperiences] = useState<
    Array<{ role: string; company: string; period: string; description: string }>
  >([
    { role: '', company: '', period: '', description: '' },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const objectUrl = URL.createObjectURL(file);
    setResumeFile({
      name: file.name,
      size: `${sizeInMB} MB`,
      url: objectUrl,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { role: '', company: '', period: '', description: '' }]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (
    index: number,
    field: 'role' | 'company' | 'period' | 'description',
    value: string
  ) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validExperiences = experiences.filter((exp) => exp.role.trim() || exp.company.trim());

    onSubmitApplication({
      candidateName,
      email,
      position: job.title,
      portfolioUrl,
      coverLetter,
      resumeName: resumeFile?.name,
      resumeUrl: resumeFile?.url,
      experienceSummary: validExperiences,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#f8f9fa] w-full max-w-2xl border border-[#747878]/30 p-8 md:p-10 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#000000] hover:text-[#a33e00] transition-colors p-2"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <span className="label-caps text-[#a33e00] block mb-2">{job.department} • {job.location}</span>
        <h2 className="font-serif text-3xl font-bold text-[#000000] mb-6">
          Apply for {job.title}
        </h2>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <span className="material-symbols-outlined text-6xl text-[#a33e00]">check_circle</span>
            <h3 className="font-serif text-2xl font-bold text-[#000000]">Application Submitted</h3>
            <p className="text-[#444748]">Thank you, {candidateName}. Our studio operations team will review your portfolio and resume shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="label-caps text-[#444748] block mb-2 uppercase">Full Name *</label>
              <input
                type="text"
                required
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g., Elias Thorne"
                className="w-full bg-transparent border-0 border-b border-[#747878]/30 py-2 text-[#000000] focus:ring-0 focus:border-[#000000]"
              />
            </div>

            <div>
              <label className="label-caps text-[#444748] block mb-2 uppercase">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elias@example.com"
                className="w-full bg-transparent border-0 border-b border-[#747878]/30 py-2 text-[#000000] focus:ring-0 focus:border-[#000000]"
              />
            </div>

            <div>
              <label className="label-caps text-[#444748] block mb-2 uppercase">Portfolio / Website URL</label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://eliasthorne-portfolio.com"
                className="w-full bg-transparent border-0 border-b border-[#747878]/30 py-2 text-[#000000] focus:ring-0 focus:border-[#000000]"
              />
            </div>

            {/* Resume / CV Upload Field */}
            <div>
              <label className="label-caps text-[#444748] block mb-2 uppercase">
                Resume / CV <span className="text-[#a33e00]">*</span>
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-file-input"
              />

              {!resumeFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#a33e00] bg-[#a33e00]/5'
                      : 'border-[#747878]/30 hover:border-[#000000] bg-[#ffffff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl text-[#a33e00] mb-2 block">
                    upload_file
                  </span>
                  <p className="text-sm font-semibold text-[#000000] mb-1">
                    Click to upload or drag & drop your Resume / CV
                  </p>
                  <p className="text-xs text-[#747878] label-caps">
                    PDF, DOC, or DOCX (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-[#ffffff] border border-[#747878]/30 shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="material-symbols-outlined text-2xl text-[#a33e00]">
                      description
                    </span>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-[#000000] truncate">
                        {resumeFile.name}
                      </p>
                      <p className="text-xs text-[#747878]">{resumeFile.size}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={removeResume}
                    className="p-1.5 text-[#747878] hover:text-[#ba1a1a] transition-colors shrink-0"
                    title="Remove attachment"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              )}
            </div>

            {/* Previous Experience Section */}
            <div className="space-y-4 pt-2 border-t border-[#747878]/20">
              <div className="flex justify-between items-center">
                <label className="label-caps text-[#000000] font-bold uppercase tracking-wider block">
                  Previous Experience
                </label>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1 text-xs label-caps text-[#a33e00] hover:text-[#000000] font-bold transition-colors"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span>Add Role / Studio</span>
                </button>
              </div>

              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border border-[#747878]/20 space-y-3 relative group"
                >
                  {experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(index)}
                      className="absolute top-3 right-3 text-[#747878] hover:text-[#ba1a1a] transition-colors p-1"
                      title="Remove experience entry"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="label-caps text-[10px] text-[#444748] block mb-1 uppercase">
                        Role / Position
                      </label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                        placeholder="e.g. Senior Architect"
                        className="w-full bg-transparent border-0 border-b border-[#747878]/30 py-1.5 text-sm text-[#000000] focus:ring-0 focus:border-[#000000]"
                      />
                    </div>

                    <div>
                      <label className="label-caps text-[10px] text-[#444748] block mb-1 uppercase">
                        Company / Studio
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        placeholder="e.g. Herzog & de Meuron"
                        className="w-full bg-transparent border-0 border-b border-[#747878]/30 py-1.5 text-sm text-[#000000] focus:ring-0 focus:border-[#000000]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-1">
                      <label className="label-caps text-[10px] text-[#444748] block mb-1 uppercase">
                        Period / Years
                      </label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                        placeholder="e.g. 2021 - 2024"
                        className="w-full bg-transparent border-0 border-b border-[#747878]/30 py-1.5 text-sm text-[#000000] focus:ring-0 focus:border-[#000000]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="label-caps text-[10px] text-[#444748] block mb-1 uppercase">
                        Key Responsibilities / Projects
                      </label>
                      <input
                        type="text"
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        placeholder="e.g. Led design development for residential high-rise..."
                        className="w-full bg-transparent border-0 border-b border-[#747878]/30 py-1.5 text-sm text-[#000000] focus:ring-0 focus:border-[#000000]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="label-caps text-[#444748] block mb-2 uppercase">Cover Letter / Note</label>
              <textarea
                rows={3}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Brief summary of your architectural background and design ethos..."
                className="w-full bg-transparent border border-[#747878]/20 p-3 text-[#000000] focus:ring-0 focus:border-[#000000] resize-none"
              />
            </div>

            <div className="flex justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-[#000000] text-[#000000] label-caps hover:bg-[#edeeef]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-[#000000] text-white label-caps hover:bg-[#a33e00] uppercase"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

