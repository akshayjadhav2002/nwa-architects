import React, { useState } from 'react';
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
  }) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, onClose, onSubmitApplication }) => {
  const [candidateName, setCandidateName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitApplication({
      candidateName,
      email,
      position: job.title,
      portfolioUrl,
      coverLetter,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#f8f9fa] w-full max-w-2xl border border-[#747878]/30 p-8 md:p-10 shadow-2xl relative">
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
            <p className="text-[#444748]">Thank you, {candidateName}. Our studio operations team will review your portfolio shortly.</p>
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

            <div>
              <label className="label-caps text-[#444748] block mb-2 uppercase">Cover Letter / Note</label>
              <textarea
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Brief summary of your architectural background and design ethos..."
                className="w-full bg-transparent border border-[#747878]/20 p-3 text-[#000000] focus:ring-0 focus:border-[#000000] resize-none"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
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
