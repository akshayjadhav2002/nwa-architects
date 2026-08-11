import React, { useState } from 'react';
import { Project } from '../types';
import { ProjectDetailModal } from '../components/ProjectDetailModal';

interface PortfolioViewProps {
  projects: Project[];
  onNavigate: (tab: 'portfolio' | 'studio' | 'careers' | 'contact' | 'admin') => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ projects, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Cultural', 'Institutional', 'Healthcare'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full h-[85vh] min-h-[500px] relative flex items-center justify-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center filter grayscale contrast-125"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCPYVOzwOCM0sV9yhgAQHqhODVTKuCbr7uYzcUxMivw7K2MVZYrEuBkd8u_IUDnJ7FbOSSyDUqZ934XiICOZhWXHRvmulPn0uq59awdwYmcZ-P9q_FbYEPvuFBnyQjQEjZYPhJr-U6-XbyqRDD5VlANZwAxGbUiJEQIt54aIKRjs5CVNR04qJtX5EsRONMnwG0eMPQfN1rHXUtqQOFMsUHyO-4Isd142bByvz6xYjPijt8RHPY4ISPBsA")',
            }}
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] w-full flex flex-col gap-6 text-white">
          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl leading-tight">
            Designing permanence through minimal intervention.
          </h1>
        </div>
      </section>

      {/* Selected Works Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-20 py-16 md:py-24">
        {/* Header & Filter Bar */}
        <div className="w-full mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#747878]/20 pb-8">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#000000] mb-4">
              Selected Works
            </h2>
            <p className="text-[#444748] text-base md:text-lg max-w-xl">
              A curated archive of our structural interventions, exploring the tension between mass and void.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`label-caps pb-1 transition-colors ${
                  selectedCategory === cat
                    ? 'text-[#a33e00] border-b border-[#a33e00] font-bold'
                    : 'text-[#444748] hover:text-[#a33e00]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {filteredProjects.map((project, index) => {
            // Asymmetric layout logic for gallery feel
            const isFirst = index === 0;
            const spanClass = isFirst
              ? 'md:col-span-12 h-[550px]'
              : index % 3 === 0
              ? 'md:col-span-8 h-[480px]'
              : 'md:col-span-4 h-[480px]';

            return (
              <div
                key={project.id}
                onClick={() => setActiveProjectModal(project)}
                className={`${spanClass} group cursor-pointer relative overflow-hidden bg-[#e1e3e4] border border-[#747878]/10 transition-all duration-500`}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="label-caps text-white/80 mb-2">
                      0{index + 1} / {project.category} / {project.year}
                    </p>
                    <h3 className="font-serif text-2xl md:text-4xl font-semibold">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle when not hovered */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 md:hidden group-hover:hidden border border-[#747878]/10">
                  <p className="label-caps text-[#a33e00] text-[10px] mb-1">
                    {project.category} • {project.year}
                  </p>
                  <h4 className="font-serif text-lg font-bold text-[#000000]">{project.title}</h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="w-full flex justify-center mt-16">
          <button
            onClick={() => setSelectedCategory('All')}
            className="border border-[#000000] text-[#000000] px-8 py-4 label-caps hover:bg-[#a33e00] hover:text-white hover:border-[#a33e00] transition-colors duration-300 uppercase tracking-widest"
          >
            Load More Projects
          </button>
        </div>
      </section>

      {/* About / Studio Manifesto Teaser */}
      <section className="bg-[#f3f4f5] py-20 border-t border-b border-[#747878]/15">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#000000] mb-6">
              Studio
            </h2>
            <p className="text-base md:text-lg text-[#444748] mb-8 leading-relaxed">
              Aethelgard Architects is a multidisciplinary design studio focused on creating spaces that resonate with a sense of deliberate calm. We believe in the eloquent reduction of form.
            </p>
            <button
              onClick={() => onNavigate('studio')}
              className="px-8 py-4 bg-[#000000] text-white label-caps hover:bg-[#a33e00] transition-colors uppercase"
            >
              Read Manifesto
            </button>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="aspect-square bg-[#e1e3e4] relative overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLvfdOA7-iFZuZbXcpSKwdIE3RXM_wJkyGNlPeyLqEJ4Nuyx1NUcUpU3bIkKMXdh46_JzDcpHpAskKclLYO0I3-fytfhWo4iHEDfCWGYb4JUmESGwiiq2hJO2f_DgXdzTy5RIKTK_bsSwdLESnqLfffZCZ_SCEKhqkcS_nXETEMzM5gwhKmvuKEEo_iq0hKKdF72o--rz-tp5FgbpsnEAFwLa8rzFy_lsMH2u3AY4paWIOBUI0aOrg0cqfLq"
                alt="Studio Texture"
                className="w-full h-full object-cover filter grayscale contrast-125 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </main>
  );
};
