import React, { useState } from 'react';
import { Project } from '../../types';

interface AdminProjectsProps {
  projects: Project[];
  onAddProject: (p: Omit<Project, 'id' | 'lastEdited' | 'editedBy'>) => void;
  onUpdateProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
  onNavigate?: (view: 'dashboard' | 'projects' | 'jobs' | 'applications' | 'settings') => void;
}

export const AdminProjects: React.FC<AdminProjectsProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onNavigate,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Project['category']>('Residential');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<Project['status']>('In Progress');
  const [saveFeedback, setSaveSubmitted] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Residential');
    setLocation('');
    setYear(new Date().getFullYear());
    setDescription('');
    setImageUrl('');
    setStatus('In Progress');
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setTitle(p.title);
    setCategory(p.category);
    setLocation(p.location);
    setYear(p.year);
    setDescription(p.description);
    setImageUrl(p.imageUrl);
    setStatus(p.status);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const defaultImg = imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

    if (editingId) {
      const existing = projects.find((p) => p.id === editingId);
      if (existing) {
        onUpdateProject({
          ...existing,
          title,
          category,
          location,
          year,
          description,
          imageUrl: defaultImg,
          status,
          lastEdited: 'Just now',
          editedBy: 'Admin',
        });
      }
    } else {
      onAddProject({
        title,
        category,
        location: location || 'Pune, India',
        year,
        description,
        imageUrl: defaultImg,
        status,
      });
    }

    setSaveSubmitted(true);
    setTimeout(() => {
      setSaveSubmitted(false);
      resetForm();
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fa] overflow-hidden">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end px-6 md:px-20 py-8 border-b border-[#747878]/15 shrink-0 bg-[#f8f9fa] gap-4">
        <div>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="md:hidden inline-flex items-center gap-1.5 text-xs label-caps font-bold text-[#a33e00] hover:text-[#000000] mb-2 transition-colors uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Back to Dashboard</span>
            </button>
          )}
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#000000] mb-2">
            Project Management
          </h2>
          <p className="text-sm md:text-base text-[#444748]">
            Add new architectural works or manage existing portfolio items.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="bg-[#000000] text-white label-caps px-6 py-3 hover:bg-[#a33e00] transition-colors duration-300 uppercase tracking-widest"
        >
          {editingId ? 'Update Project' : 'Save Project'}
        </button>
      </header>

      {/* Main Form + List Layout */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-20 py-12">
        <div className="grid grid-cols-12 gap-8 max-w-[1440px] mx-auto">
          {/* Left Column: Form */}
          <div className="col-span-12 lg:col-span-7 pr-0 lg:pr-8">
            <div className="flex justify-between items-center mb-8 border-b border-[#747878]/15 pb-4">
              <h3 className="label-caps text-[#000000] font-bold text-sm">
                01 / Project Details {editingId && '(Editing Mode)'}
              </h3>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-xs text-[#a33e00] hover:underline uppercase label-caps"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {saveFeedback && (
              <div className="mb-6 p-4 bg-[#a33e00]/10 border border-[#a33e00] text-[#a33e00] text-sm label-caps">
                Project saved successfully!
              </div>
            )}

            <form onSubmit={handleSave} className="flex flex-col gap-8">
              <div className="flex flex-col">
                <label htmlFor="p-title" className="label-caps text-[#444748] mb-2">
                  Project Title
                </label>
                <input
                  id="p-title"
                  type="text"
                  required
                  placeholder="e.g., The Glass Pavilion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-underline text-lg text-[#000000] py-2 focus:ring-0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label htmlFor="p-cat" className="label-caps text-[#444748] mb-2">
                    Category
                  </label>
                  <select
                    id="p-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Project['category'])}
                    className="input-underline text-base text-[#000000] py-2 focus:ring-0 cursor-pointer"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Office">Office</option>
                    <option value="Urban Planning">Urban Planning</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="p-loc" className="label-caps text-[#444748] mb-2">
                    Location
                  </label>
                  <input
                    id="p-loc"
                    type="text"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-underline text-base text-[#000000] py-2 focus:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label htmlFor="p-year" className="label-caps text-[#444748] mb-2">
                    Completion Year
                  </label>
                  <input
                    id="p-year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="input-underline text-base text-[#000000] py-2 focus:ring-0"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="p-status" className="label-caps text-[#444748] mb-2">
                    Status
                  </label>
                  <select
                    id="p-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Project['status'])}
                    className="input-underline text-base text-[#000000] py-2 focus:ring-0 cursor-pointer"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Concept Phase">Concept Phase</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="p-desc" className="label-caps text-[#444748] mb-4">
                  Project Description
                </label>
                <textarea
                  id="p-desc"
                  rows={5}
                  placeholder="Detail the architectural concept, materials used, and client brief..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-[#747878]/20 rounded-sm p-4 text-base focus:border-[#000000] focus:ring-0 bg-transparent resize-none"
                />
              </div>

              <h3 className="label-caps text-[#000000] font-bold text-sm mt-8 border-b border-[#747878]/15 pb-4">
                02 / Media Assets
              </h3>

              {/* Image URL Input & Dropzone */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="p-img" className="label-caps text-[#444748] mb-2">
                    Image Asset URL
                  </label>
                  <input
                    id="p-img"
                    type="url"
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="input-underline text-sm text-[#000000] py-2 focus:ring-0"
                  />
                </div>

                <div className="border-2 border-dashed border-[#747878]/20 rounded-sm p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#000000]/50 transition-colors bg-[#f3f4f5] group">
                  {imageUrl ? (
                    <div className="w-full h-40 overflow-hidden relative mb-2">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-[#444748] mb-4 group-hover:text-[#000000] transition-colors">
                      cloud_upload
                    </span>
                  )}
                  <p className="text-base font-semibold text-[#000000] mb-1">
                    Drag and drop images here
                  </p>
                  <p className="label-caps text-[#444748] text-[11px]">
                    or click to browse files (Max 10MB per image)
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Existing Portfolio Archive List */}
          <div className="col-span-12 lg:col-span-5 pl-0 lg:pl-8 lg:border-l border-[#747878]/15 mt-12 lg:mt-0">
            <div className="flex justify-between items-end mb-8 border-b border-[#747878]/15 pb-4">
              <h3 className="label-caps text-[#000000] font-bold text-sm">
                Portfolio Archive
              </h3>
              <span className="label-caps text-[#444748]">
                {projects.length} Projects
              </span>
            </div>

            <div className="flex flex-col gap-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`flex items-center justify-between p-4 bg-white border rounded-sm transition-colors ${
                    editingId === project.id
                      ? 'border-[#a33e00] ring-1 ring-[#a33e00]'
                      : 'border-[#747878]/15 hover:border-[#000000]/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#e1e3e4] rounded-sm overflow-hidden shrink-0">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover filter grayscale opacity-80 hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-[#000000] truncate max-w-[180px]">
                        {project.title}
                      </h4>
                      <p className="label-caps text-[#444748] text-[10px] mt-1">
                        {project.category} • {project.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(project)}
                      className="p-2 text-[#444748] hover:text-[#000000] transition-colors"
                      title="Edit project"
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="p-2 text-[#444748] hover:text-[#ba1a1a] transition-colors"
                      title="Delete project"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
