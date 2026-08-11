import React, { useState } from 'react';
import { Application } from '../../types';

interface AdminApplicationsProps {
  applications: Application[];
  onUpdateApplication: (app: Application) => void;
}

export const AdminApplications: React.FC<AdminApplicationsProps> = ({
  applications,
  onUpdateApplication,
}) => {
  const [selectedId, setSelectedId] = useState<string>(applications[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [noteText, setNoteText] = useState('');

  const currentApp = applications.find((a) => a.id === selectedId) || applications[0];

  const handleStatusChange = (newStatus: Application['status']) => {
    if (currentApp) {
      onUpdateApplication({
        ...currentApp,
        status: newStatus,
      });
    }
  };

  const handleSaveNote = () => {
    if (currentApp && noteText.trim()) {
      onUpdateApplication({
        ...currentApp,
        notes: currentApp.notes
          ? `${currentApp.notes}\n[Note]: ${noteText}`
          : noteText,
      });
      setNoteText('');
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fa] overflow-hidden">
      {/* Header */}
      <header className="h-20 shrink-0 flex items-center px-6 md:px-20 border-b border-[#747878]/15 bg-[#f8f9fa]">
        <h2 className="font-serif text-3xl font-bold text-[#000000]">
          Application Review
        </h2>
      </header>

      {/* Master-Detail Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Candidate List (Master) */}
        <section className="w-full md:w-80 lg:w-96 flex flex-col border-r border-[#747878]/15 bg-[#f8f9fa]">
          {/* Filters & Search */}
          <div className="p-4 border-b border-[#747878]/15 flex flex-col gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-0 bottom-2 text-[#747878]">
                search
              </span>
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pb-2 bg-transparent border-0 border-b border-[#747878]/30 focus:border-[#000000] text-sm text-[#191c1d] placeholder-[#747878] focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between text-xs label-caps text-[#444748]">
              <span>Filter Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent border-0 border-b border-[#747878]/30 text-xs text-[#000000] focus:ring-0 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Reviewing">Reviewing</option>
                <option value="New">New</option>
                <option value="Interview">Interview</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-[#747878]/10">
            {filteredApps.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#444748]">
                No applications match your query.
              </div>
            ) : (
              filteredApps.map((app) => {
                const isSelected = app.id === currentApp?.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedId(app.id)}
                    className={`p-6 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#edeeef] border-l-4 border-[#000000]'
                        : 'hover:bg-[#f3f4f5]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-base text-[#000000]">
                        {app.candidateName}
                      </h3>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded label-caps ${
                          app.status === 'Reviewing'
                            ? 'bg-[#a33e00]/10 text-[#a33e00]'
                            : app.status === 'New'
                            ? 'bg-[#e1e3e4] text-[#000000]'
                            : app.status === 'Interview'
                            ? 'bg-blue-100 text-blue-800'
                            : app.status === 'Hired'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#444748] mb-1">{app.position}</p>
                    <p className="text-xs text-[#747878]">Applied: {app.appliedDate}</p>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Right: Candidate Profile (Detail) */}
        {currentApp ? (
          <section className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8f9fa] p-8 md:p-12">
            <div className="max-w-3xl mx-auto space-y-12">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start gap-8">
                <img
                  src={currentApp.avatarUrl}
                  alt={currentApp.candidateName}
                  className="w-32 h-32 object-cover rounded-sm grayscale border border-[#747878]/20"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="font-serif text-4xl font-bold text-[#000000]">
                    {currentApp.candidateName}
                  </h2>
                  <p className="font-serif italic text-lg text-[#444748]">
                    Applying for: {currentApp.position}
                  </p>

                  <div className="flex flex-wrap gap-6 pt-2 text-sm">
                    {currentApp.email && (
                      <a
                        href={`mailto:${currentApp.email}`}
                        className="flex items-center gap-2 text-[#444748] hover:text-[#a33e00] transition-colors label-caps"
                      >
                        <span className="material-symbols-outlined text-sm">mail</span>
                        <span>{currentApp.email}</span>
                      </a>
                    )}
                    {currentApp.portfolioUrl && (
                      <a
                        href={`https://${currentApp.portfolioUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-[#444748] hover:text-[#a33e00] transition-colors label-caps"
                      >
                        <span className="material-symbols-outlined text-sm">language</span>
                        <span>{currentApp.portfolioUrl}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience Summary */}
              <div className="space-y-6">
                <h4 className="label-caps text-[#000000] border-b border-[#747878]/20 pb-2 uppercase tracking-widest font-bold">
                  Experience Summary
                </h4>

                <div className="space-y-6">
                  {currentApp.experienceSummary && currentApp.experienceSummary.length > 0 ? (
                    currentApp.experienceSummary.map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <h5 className="font-semibold text-lg text-[#000000]">
                          {exp.role} - {exp.company}
                        </h5>
                        <p className="text-sm text-[#444748]">{exp.period}</p>
                        {exp.description && (
                          <p className="text-base text-[#191c1d] mt-2 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#444748]">No prior experience detailed.</p>
                  )}
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-6">
                <h4 className="label-caps text-[#000000] border-b border-[#747878]/20 pb-2 uppercase tracking-widest font-bold">
                  Attachments
                </h4>

                <div className="flex flex-wrap gap-4">
                  {currentApp.attachments && currentApp.attachments.map((att, idx) => (
                    <a
                      key={idx}
                      href={att.url}
                      className="flex items-center gap-3 px-6 py-4 border border-[#747878]/20 hover:border-[#a33e00] hover:text-[#a33e00] transition-colors bg-white group"
                    >
                      <span className="material-symbols-outlined group-hover:text-[#a33e00]">
                        description
                      </span>
                      <span className="label-caps text-[#000000] group-hover:text-[#a33e00]">
                        {att.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-4">
                <h4 className="label-caps text-[#000000] border-b border-[#747878]/20 pb-2 uppercase tracking-widest font-bold">
                  Internal Notes
                </h4>

                {currentApp.notes && (
                  <div className="p-4 bg-[#f3f4f5] border border-[#747878]/15 text-sm text-[#191c1d] whitespace-pre-wrap font-sans">
                    {currentApp.notes}
                  </div>
                )}

                <div className="relative">
                  <textarea
                    rows={4}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add an internal reviewer note..."
                    className="w-full bg-[#f8f9fa] border-b border-[#747878]/30 border-t-0 border-x-0 focus:ring-0 focus:border-[#000000] text-sm p-4 resize-none"
                  />
                  <button
                    onClick={handleSaveNote}
                    className="absolute bottom-4 right-4 label-caps text-[#a33e00] hover:text-[#000000] transition-colors uppercase font-bold"
                  >
                    Save Note
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-8 border-t border-[#747878]/15">
                <button
                  onClick={() => handleStatusChange('Interview')}
                  className="bg-[#000000] text-white px-8 py-4 label-caps uppercase hover:bg-[#a33e00] transition-colors"
                >
                  Move to Interview
                </button>

                <button
                  onClick={() => handleStatusChange('Rejected')}
                  className="border border-[#000000] text-[#000000] px-8 py-4 label-caps uppercase hover:bg-[#ffdad6] hover:text-[#ba1a1a] hover:border-[#ba1a1a] transition-colors"
                >
                  Reject
                </button>

                <button
                  onClick={() => handleStatusChange('Hired')}
                  className="border border-[#000000] text-[#000000] px-8 py-4 label-caps uppercase hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                >
                  Mark as Hired
                </button>

                <div className="flex-1"></div>

                <button
                  onClick={() => alert(`Shared profile for ${currentApp.candidateName}`)}
                  className="flex items-center gap-2 text-[#444748] hover:text-[#000000] transition-colors"
                >
                  <span className="material-symbols-outlined">share</span>
                  <span className="label-caps uppercase">Share with Team</span>
                </button>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#747878] label-caps">
            Select an application to review.
          </div>
        )}
      </div>
    </div>
  );
};
