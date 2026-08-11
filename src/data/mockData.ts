import { Project, JobPosting, Application, StudioSettings, ContactInquiry } from '../types';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Chhatrapati Square',
    category: 'Commercial',
    location: 'Kyoto, Japan',
    year: 2023,
    description: 'A striking commercial intervention exploring the tension between monolithic concrete mass and ethereal glass lightwells.',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLvfdOA7-iFZuZbXcpSKwdIE3RXM_wJkyGNlPeyLqEJ4Nuyx1NUcUpU3bIkKMXdh46_JzDcpHpAskKclLYO0I3-fytfhWo4iHEDfCWGYb4JUmESGwiiq2hJO2f_DgXdzTy5RIKTK_bsSwdLESnqLfffZCZ_SCEKhqkcS_nXETEMzM5gwhKmvuKEEo_iq0hKKdF72o--rz-tp5FgbpsnEAFwLa8rzFy_lsMH2u3AY4paWIOBUI0aOrg0cqfLq',
    status: 'In Progress',
    lastEdited: '2 hrs ago',
    editedBy: 'J. Doe',
  },
  {
    id: 'proj-2',
    title: 'Ale Vividh Karyakari Society',
    category: 'Cultural',
    location: 'Pune, India',
    year: 2022,
    description: 'Institutional cultural center utilizing locally sourced stone masonry and raw timber screens to create a climate-responsive public void.',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLtAJBeGOIMGk6R3tUQp36wnju1dGJ5XO5bHlxuWGLmslLyZnjWN9oJqk__OrPWthZfdmTljxbxd2jCMxRy637Lu5ieu58l4ODs-OpJ7HDeaYdH5_q6__gXobH9steeuNBG1ygIQM3cysYF7KSYPxlcDcptPcFwD9yKJM-4lNs859UpewH0N0gx4_VKARBr2cRvrKVwL147hc-Z_18iFOIAX_k102-NwIbfl5KAyJu70V_qem7VGuZx2TNE',
    status: 'Concept Phase',
    lastEdited: '1 day ago',
    editedBy: 'S. Smith',
  },
  {
    id: 'proj-3',
    title: 'Jayram Heights',
    category: 'Commercial',
    location: 'Mumbai, India',
    year: 2022,
    description: 'High-rise commercial structure integrating vertical gardens and minimalist structural glazing.',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLsnPJA4XVPqDFnscjNik6aUz42R6MqPdwNHEDnEGRxKeXzaEajr-HGpLXaZ_O7QbbA2I2dyjNIyrzaozUnRdeebkrIB1TG8KIEoL3d_dUrIfox4NVxl9vfDK54IhyGMAii9XS76DPiYj58b842H1YYPYrvDe2MxovHC9bpvEM3Vwc-kQkNrZmzizLAFqrdvS1Sg-qbQov3s2fgzQtBORzyzkKy28JnG2cFIEAsVj1-dktALyNPzM3GROGLo',
    status: 'Completed',
    lastEdited: '2 days ago',
    editedBy: 'N. Waman',
  },
  {
    id: 'proj-4',
    title: 'Londhe Hospital',
    category: 'Healthcare',
    location: 'Maharashtra, India',
    year: 2024,
    description: 'A serene healthcare facility emphasizing natural light, acoustic dampening, and courtyard voids for therapeutic patient wellness.',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLvQYCCg0YpnnY5RE3_9Xus1JFW4_9LMJIc2uYD6bu25EIo41IQjcrLJElGoPFP2UvYSzvHxczlil_4sEAK50HiCDrZ3I4decNpZuTZfktXxFe4oBwWQAg73ZKEsOsWzdLW8Cil-zONos8yvLlXBMJ6TKYRx4NrgUwQDIGuT16CFRqDRSRtB6PNtwwl9eGyxnSb768lfZIiCL2JC2Z5tQTuRIBgHTheYusotS2a2xlZe67KROqHh2V-ikL0O',
    status: 'In Progress',
    lastEdited: '3 days ago',
    editedBy: 'Admin',
  },
  {
    id: 'proj-5',
    title: 'Temple Complex',
    category: 'Cultural',
    location: 'Nashik, India',
    year: 2021,
    description: 'Contemporary sacred architecture balancing timeless basalt geometry with dramatic play of light and shadow.',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLvCFrBfgiwBT4W77ASsTXCZDCORfvPoHpPw7duaHOQ3t2phIiXtfy_5WNEee21q2agHYmEO54PpWjzz5mCSz-2DRrejgVDmIT8ygRZ15lV9fkgi1T0ZmV7RgcKGa0Fq_VxRI1mDWzEHmn2mOW4I3gXxlhAo5spHm83OkCE5Fl8UwmSVryWatEn8bmxxeX_N2VES6Q_WvyOLMYOEDVwizYZvL-KMFdSkEUlla06ksoZJphYhMvcciPB7xUop',
    status: 'Completed',
    lastEdited: '5 days ago',
    editedBy: 'J. Doe',
  },
  {
    id: 'proj-6',
    title: 'NWA Architects HQ',
    category: 'Office',
    location: 'Pune, India',
    year: 2024,
    description: 'The studio flagship workspace, designed as an open-plan laboratory for architectural research, raw concrete models, and light calibration.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOg9ss3T3KcT723XDH2jEFvKOsJIJvBkeZWDfuyCkkMogc1U8n7m-BUczTHs4xoZjFLhjc6N7Qi_xQHvtRMnQ4YoYT0yokTFmQnwXYiw4wXPd7TE1CsuPflN126-HOwD-btSdz42DTaMzrrz55SIohysRLvZ6_SAHm6Q3lGx5O8Wk8DIYX7fZ1byUNZVm5CyCPoFoDu6E-g67b7cCDPMkmNbzg1v9uwTUFrMoJlenYmzJQK5PcJ-p6DQ',
    status: 'Completed',
    lastEdited: '3 days ago',
    editedBy: 'Admin',
  },
  {
    id: 'proj-7',
    title: 'The Obsidian Residence',
    category: 'Residential',
    location: 'Kyoto, Japan',
    year: 2023,
    description: 'A striking residential pavilion featuring raw timber, blackened steel, and expansive courtyard reflection pools.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzMhgBwRLtUUPdA2O296qTjjpcs4LvasaILfEOsizAWhGfWQ5BHtnvNhTsmEZK155ST43TYb28KoNtofK8jX6fosk6zYq6UhPGuGnq6-IBEwJs4WVm14UWpHsVXPTMFndaCvrQIGzxrg7hbkGMWXJmQUu-7ExM6tEpX_jG2ru2j3TsICw3MkR4eQttyujWCEVmKkJVqvLBVot1yFhczqyRJX9sVX0cLwpNkhmAebTyKGx_r1-_E8cyFA',
    status: 'Completed',
    lastEdited: '1 week ago',
    editedBy: 'S. Smith',
  },
  {
    id: 'proj-8',
    title: 'Gallery V',
    category: 'Cultural',
    location: 'London, UK',
    year: 2022,
    description: 'A stark minimalist contemporary art gallery with polished concrete floors and concealed skylights.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs0qChvcAOidOAoJMuduBJ6nk0wqjvIlLG4WxOeFyFHEzHPqyAkEAC4lPchA2Ewc1R5xQa07YwlVdO8FRCURWQotuakEbG7OLbEIa1ntn6NstW1JR-UVP2ju6be38zwCxPAk5H2XOf2V2UHiIUwxmIoxDFLgPDJ871HUikZwVcqCrqJJ0gCk48ekkeggGXK0VqEHXnY_7sW2Xhxb34jFIaP2hsAiHtk-1AVvJ8M4B8NZQCXyZ1zHmHyA',
    status: 'Completed',
    lastEdited: '2 weeks ago',
    editedBy: 'J. Doe',
  }
];

export const initialJobs: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior Design Architect',
    department: 'Design',
    location: 'New York, NY',
    status: 'Active',
    postedDate: 'Oct 12, 2024',
    description: 'Lead design teams on monumental civic and commercial projects, establishing spatial concepts and guiding structural details.',
    requirements: [
      '10+ years experience in architectural practice',
      'Master of Architecture degree or equivalent',
      'Proficiency in Rhino, Revit, and physical model crafting',
      'Strong portfolio of minimalist or brutalist works'
    ]
  },
  {
    id: 'job-2',
    title: 'Lead Interior Specialist',
    department: 'Interior Design',
    location: 'London, UK',
    status: 'Active',
    postedDate: 'Oct 08, 2024',
    description: 'Curate tactile interior environments, custom furniture design, and material specifications for high-end residential and cultural spaces.',
    requirements: [
      '7+ years experience in luxury interior design',
      'Expertise in bespoke furniture prototyping and stone/wood detailing',
      'Track record of managing international client relationships'
    ]
  },
  {
    id: 'job-3',
    title: 'Studio Operations Director',
    department: 'Management',
    location: 'New York, NY',
    status: 'Active',
    postedDate: 'Oct 05, 2024',
    description: 'Oversee studio workflows, recruitment pipelines, financial modeling, and interdisciplinary team synchronization across global offices.',
    requirements: [
      '8+ years management experience in architectural or creative studios',
      'Strong financial acuity and contract negotiation skills',
      'Passionate about design culture and human capital development'
    ]
  },
  {
    id: 'job-4',
    title: 'Interior Designer',
    department: 'Interiors',
    location: 'London, UK',
    status: 'Draft',
    postedDate: 'Oct 05, 2024',
    description: 'Assist in drafting material palettes, spatial layouts, and interior lighting schemes.',
    requirements: [
      '3+ years experience in interior design studio',
      'Strong CAD and rendering capabilities'
    ]
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app-1',
    candidateName: 'Elias Thorne',
    position: 'Senior Design Architect',
    appliedDate: 'Oct 12, 2024',
    status: 'Reviewing',
    email: 'elias.thorne@example.com',
    portfolioUrl: 'eliasthorne-portfolio.com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFQfznO0PWpmE7jlqr4FU94kRH7xbj24v33OdMz6rOAh5HAVJE6_pe7USAMhzx9IYo84G1PRDtH9H0TO3ErgpKMvV3mcimNa7ExBe9_mDePVdes92gVAXK9HlwHSphMKw53Jf6VHQNugotZlgJUqbts7uN74xDuDuppfQ4iMza-68CYAlnG6ttEuVP1NiBzySa_mDnBinVNm40OeFFUHgmnPThUUCcOMtPaTioScY6P6Wb4kRTsQ6W5Q',
    experienceSummary: [
      {
        role: 'Lead Architect',
        company: 'Foster & Partners',
        period: '2018 - Present',
        description: 'Led design teams on large-scale commercial projects, emphasizing sustainable materials and brutalist aesthetics. Managed client relations and oversaw construction phases.'
      },
      {
        role: 'Architectural Designer',
        company: 'OMA',
        period: '2014 - 2018',
        description: 'Contributed to conceptual design models and urban planning proposals across Asia and Europe.'
      }
    ],
    attachments: [
      { name: 'Resume_EThorne.pdf', url: '#', type: 'PDF Document' },
      { name: 'CoverLetter.pdf', url: '#', type: 'PDF Document' }
    ],
    notes: 'Outstanding portfolio focusing on monolithic concrete facades. Strong candidate for interview.'
  },
  {
    id: 'app-2',
    candidateName: 'Sarah Jenkins',
    position: 'Structural Engineer',
    appliedDate: 'Oct 14, 2024',
    status: 'New',
    email: 'sarah.jenkins@example.com',
    portfolioUrl: 'jenkins-eng.com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Lpy-7SXTTLhZUGZxqA5CivxY-CiWQw3GmczSXMvSg3AmDS5ic_jMJMStroDLeIthX0C1BJrI4ErZUTbXrOxUrfRVJZORGd1j1Cu5nEIjb-jFWM0tBvRdyaQiVD-a3cGlWWa29U-kfqltdsI6g4W4SRPkMdt_sYF5SHtROvSteznw5rqVsjY4IXdGpupztmARu4E5edAzMLoiSkP12LoOTY2eLvBQE0muwetf6OeQlW0553hGfoFeQA',
    experienceSummary: [
      {
        role: 'Senior Structural Engineer',
        company: 'Arup',
        period: '2019 - Present',
        description: 'Specialized in long-span steel and mass timber structural calculations.'
      }
    ],
    attachments: [
      { name: 'S_Jenkins_CV.pdf', url: '#', type: 'PDF Document' }
    ],
    notes: 'Impressive technical engineering background.'
  },
  {
    id: 'app-3',
    candidateName: 'Marcus Chen',
    position: 'Senior Design Architect',
    appliedDate: 'Oct 10, 2024',
    status: 'Rejected',
    email: 'marcus.chen@example.com',
    portfolioUrl: 'marcuschen-arch.com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf29n-aPIJ2B19jBLqEqy5mCoWFvPRz39qJymMPlNSdWkGBk0o5lMbXU25ykCc6HIBW3F1O5ytTwQ3r2ujJdq3y41B0VbHuHY__z7DY7yyFR196YmRrD0Z0VXHj3T7_ovPpX_ZJkXwSQrQoVuhvgUVlJyfGmW2RlsTl0KNgnnhSpz9b9NXAAJGr7w2Y9k4pK81UAEqF39o2Zn2RmNoJCxgIo42p_IQSAulnMrp5c27xcYKgbohJ4_I0w',
    experienceSummary: [
      {
        role: 'Associate Architect',
        company: 'Zaha Hadid Architects',
        period: '2016 - 2023',
        description: 'Worked on parametric facade modeling.'
      }
    ],
    attachments: [
      { name: 'Marcus_Chen_Portfolio.pdf', url: '#', type: 'PDF Document' }
    ],
    notes: 'Style leaned too heavily on parametric organic curves rather than strict minimalist reduction.'
  }
];

export const initialInquiries: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    projectType: 'residential',
    message: 'We are looking to commission a private residence in Pune with emphasis on raw concrete, internal voids, and natural light.',
    createdAt: '2026-08-10'
  }
];

export const initialSettings: StudioSettings = {
  profile: {
    name: 'NWA Architects',
    registrationNumber: 'AIA-49281-NY',
    hqAddress: 'Flat no. 3, 76-Shrushti Prabhat, lane no.-15, near symbiosis School, Prabhat road, Pune - 411004',
    contactEmail: 'nwa.architects2002@gmail.com',
    phoneNumber: '+91 9850601673'
  },
  team: [
    { id: 'tm-1', name: 'Elias Hayes', role: 'Principal', status: 'Active', initials: 'EH', email: 'elias@nwaarchitects.com' },
    { id: 'tm-2', name: 'Sarah Chen', role: 'Senior Architect', status: 'Active', initials: 'SC', email: 'sarah@nwaarchitects.com' },
    { id: 'tm-3', name: 'Marcus Vance', role: 'Junior Designer', status: 'Active', initials: 'MV', email: 'marcus@nwaarchitects.com' },
    { id: 'tm-4', name: 'Lena Torres', role: 'Intern Architect', status: 'Pending', initials: 'LT', email: 'lena@nwaarchitects.com' }
  ],
  security: {
    twoFactorEnabled: false
  }
};
