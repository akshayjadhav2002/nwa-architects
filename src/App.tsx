import React, { useState, useEffect } from 'react';
import { Project, JobPosting, Application, StudioSettings, ContactInquiry } from './types';
import { initialProjects, initialJobs, initialApplications, initialSettings, initialInquiries } from './data/mockData';
import { TopNavBar } from './components/TopNavBar';
import { SideNavBar, AdminView } from './components/SideNavBar';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';

// Views
import { PortfolioView } from './views/PortfolioView';
import { StudioView } from './views/StudioView';
import { CareersView } from './views/CareersView';
import { ContactView } from './views/ContactView';

// Admin Views
import { AdminDashboard } from './views/admin/AdminDashboard';
import { AdminProjects } from './views/admin/AdminProjects';
import { AdminJobs } from './views/admin/AdminJobs';
import { AdminApplications } from './views/admin/AdminApplications';
import { AdminSettings } from './views/admin/AdminSettings';

type PublicTab = 'portfolio' | 'studio' | 'careers' | 'contact';

export function App() {
  const [activeTab, setActiveTab] = useState<PublicTab>('portfolio');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminView, setAdminView] = useState<AdminView>('dashboard');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nwa_admin_auth') === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Application Data State
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [jobs, setJobs] = useState<JobPosting[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialInquiries);
  const [settings, setSettings] = useState<StudioSettings>(initialSettings);

  // Fetch initial data from server REST API if available
  useEffect(() => {
    fetch('/api/projects')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setProjects(data))
      .catch(() => {});

    fetch('/api/jobs')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setJobs(data))
      .catch(() => {});

    fetch('/api/applications')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setApplications(data))
      .catch(() => {});

    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  // Handlers
  const handlePublicNavigate = (tab: PublicTab | 'admin') => {
    if (tab === 'admin') {
      if (isAuthenticated) {
        setIsAdminMode(true);
        setAdminView('dashboard');
      } else {
        setIsLoginModalOpen(true);
      }
    } else {
      setIsAdminMode(false);
      setActiveTab(tab);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('nwa_admin_auth', 'true');
    setIsLoginModalOpen(false);
    setIsAdminMode(true);
    setAdminView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nwa_admin_auth');
    setIsAdminMode(false);
  };

  // Projects Handlers
  const handleAddProject = (p: Omit<Project, 'id' | 'lastEdited' | 'editedBy'>) => {
    const newProj: Project = {
      ...p,
      id: `proj-${Date.now()}`,
      lastEdited: 'Just now',
      editedBy: 'Admin',
    };
    setProjects([newProj, ...projects]);

    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProj),
    }).catch(() => {});
  };

  const handleUpdateProject = (updated: Project) => {
    setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));

    fetch(`/api/projects/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));

    fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    }).catch(() => {});
  };

  // Jobs Handlers
  const handleAddJob = (j: Omit<JobPosting, 'id' | 'postedDate'>) => {
    const newJob: JobPosting = {
      ...j,
      id: `job-${Date.now()}`,
      postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };
    setJobs([newJob, ...jobs]);

    fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    }).catch(() => {});
  };

  const handleUpdateJob = (updated: JobPosting) => {
    setJobs(jobs.map((j) => (j.id === updated.id ? updated : j)));

    fetch(`/api/jobs/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter((j) => j.id !== id));

    fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    }).catch(() => {});
  };

  // Application Handlers
  const handleSubmitApplication = (appData: {
    candidateName: string;
    email: string;
    position: string;
    portfolioUrl: string;
    coverLetter: string;
  }) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      candidateName: appData.candidateName,
      position: appData.position,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'New',
      email: appData.email,
      portfolioUrl: appData.portfolioUrl,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      experienceSummary: [
        { role: 'Applicant', company: 'Portfolio Submission', period: 'Current' },
      ],
      attachments: [{ name: 'Resume.pdf', url: '#', type: 'PDF Document' }],
      notes: appData.coverLetter ? `Cover Letter: ${appData.coverLetter}` : '',
    };

    setApplications([newApp, ...applications]);

    fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData),
    }).catch(() => {});
  };

  const handleUpdateApplication = (updated: Application) => {
    setApplications(applications.map((a) => (a.id === updated.id ? updated : a)));

    fetch(`/api/applications/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  // Inquiry Handler
  const handleSubmitInquiry = (inquiry: {
    name: string;
    email: string;
    projectType: string;
    message: string;
  }) => {
    const newInquiry: ContactInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiry,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setInquiries([newInquiry, ...inquiries]);

    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    }).catch(() => {});
  };

  // Settings Handler
  const handleUpdateSettings = (newSettings: StudioSettings) => {
    setSettings(newSettings);

    fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings),
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-sans selection:bg-[#a33e00] selection:text-white antialiased">
      {isAdminMode ? (
        /* Admin Portal View Layout */
        <div className="flex-1 flex flex-col md:flex-row min-h-screen">
          {/* Mobile Admin Bar */}
          <div className="md:hidden bg-[#000000] text-white p-4 flex justify-between items-center sticky top-0 z-50">
            <span className="font-serif font-bold text-lg">Studio Admin</span>
            <button
              onClick={handleLogout}
              className="text-xs label-caps uppercase bg-white/10 px-3 py-1.5 rounded hover:bg-[#a33e00] transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Side Nav */}
          <SideNavBar
            currentView={adminView}
            onNavigate={(view) => setAdminView(view)}
            onExitAdmin={handleLogout}
          />

          {/* Admin Content Screen */}
          <div className="flex-1 flex flex-col bg-[#f8f9fa] overflow-y-auto">
            {adminView === 'dashboard' && (
              <AdminDashboard
                projects={projects}
                jobs={jobs}
                applications={applications}
                onNavigate={(v) => setAdminView(v)}
              />
            )}

            {adminView === 'projects' && (
              <AdminProjects
                projects={projects}
                onAddProject={handleAddProject}
                onUpdateProject={handleUpdateProject}
                onDeleteProject={handleDeleteProject}
              />
            )}

            {adminView === 'jobs' && (
              <AdminJobs
                jobs={jobs}
                onAddJob={handleAddJob}
                onUpdateJob={handleUpdateJob}
                onDeleteJob={handleDeleteJob}
              />
            )}

            {adminView === 'applications' && (
              <AdminApplications
                applications={applications}
                onUpdateApplication={handleUpdateApplication}
              />
            )}

            {adminView === 'settings' && (
              <AdminSettings
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
              />
            )}
          </div>
        </div>
      ) : (
        /* Public Studio Website Layout */
        <div className="flex-1 flex flex-col">
          <TopNavBar activeTab={activeTab} onNavigate={handlePublicNavigate} />

          <div className="flex-1">
            {activeTab === 'portfolio' && (
              <PortfolioView projects={projects} onNavigate={handlePublicNavigate} />
            )}

            {activeTab === 'studio' && (
              <StudioView onNavigate={handlePublicNavigate} />
            )}

            {activeTab === 'careers' && (
              <CareersView
                jobs={jobs}
                onSubmitApplication={handleSubmitApplication}
              />
            )}

            {activeTab === 'contact' && (
              <ContactView onSubmitInquiry={handleSubmitInquiry} />
            )}
          </div>

          <Footer />
        </div>
      )}

      {/* Admin Login Modal Flow */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
