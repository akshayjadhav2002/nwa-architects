import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initialProjects, initialJobs, initialApplications, initialSettings, initialInquiries } from "./src/data/mockData";

let projects = [...initialProjects];
let jobs = [...initialJobs];
let applications = [...initialApplications];
let inquiries = [...initialInquiries];
let settings = { ...initialSettings };

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // REST API Routes

  // Healthcheck
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "NWA Architects Studio API" });
  });

  // Projects API
  app.get("/api/projects", (_req, res) => {
    res.json(projects);
  });

  app.post("/api/projects", (req, res) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      title: req.body.title || "Untitled Project",
      category: req.body.category || "Residential",
      location: req.body.location || "City, Country",
      year: req.body.year || new Date().getFullYear(),
      description: req.body.description || "",
      imageUrl: req.body.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      status: req.body.status || "In Progress",
      lastEdited: "Just now",
      editedBy: "Admin",
    };
    projects.unshift(newProject);
    res.status(201).json(newProject);
  });

  app.put("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...req.body,
        lastEdited: "Just now",
        editedBy: "Admin",
      };
      res.json(projects[index]);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  });

  app.delete("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    projects = projects.filter((p) => p.id !== id);
    res.json({ success: true, id });
  });

  // Job Postings API
  app.get("/api/jobs", (_req, res) => {
    res.json(jobs);
  });

  app.post("/api/jobs", (req, res) => {
    const newJob = {
      id: `job-${Date.now()}`,
      title: req.body.title || "New Role",
      department: req.body.department || "Design",
      location: req.body.location || "New York, NY",
      status: req.body.status || "Active",
      postedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      description: req.body.description || "",
      requirements: req.body.requirements || [],
    };
    jobs.unshift(newJob);
    res.status(201).json(newJob);
  });

  app.put("/api/jobs/:id", (req, res) => {
    const { id } = req.params;
    const index = jobs.findIndex((j) => j.id === id);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...req.body };
      res.json(jobs[index]);
    } else {
      res.status(404).json({ error: "Job posting not found" });
    }
  });

  app.delete("/api/jobs/:id", (req, res) => {
    const { id } = req.params;
    jobs = jobs.filter((j) => j.id !== id);
    res.json({ success: true, id });
  });

  // Applications API
  app.get("/api/applications", (_req, res) => {
    res.json(applications);
  });

  app.post("/api/applications", (req, res) => {
    const newApp = {
      id: `app-${Date.now()}`,
      candidateName: req.body.candidateName || "Candidate",
      position: req.body.position || "Applicant",
      appliedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      status: "New" as const,
      email: req.body.email || "",
      portfolioUrl: req.body.portfolioUrl || "",
      avatarUrl: req.body.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      experienceSummary: req.body.experienceSummary || [],
      attachments: req.body.attachments || [{ name: "Resume.pdf", url: "#", type: "PDF Document" }],
      notes: req.body.coverLetter ? `Cover Letter snippet: ${req.body.coverLetter}` : "",
    };
    applications.unshift(newApp);
    res.status(201).json(newApp);
  });

  app.put("/api/applications/:id", (req, res) => {
    const { id } = req.params;
    const index = applications.findIndex((a) => a.id === id);
    if (index !== -1) {
      applications[index] = { ...applications[index], ...req.body };
      res.json(applications[index]);
    } else {
      res.status(404).json({ error: "Application not found" });
    }
  });

  // Contact Inquiries API
  app.get("/api/inquiries", (_req, res) => {
    res.json(inquiries);
  });

  app.post("/api/inquiries", (req, res) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      name: req.body.name || "Anonymous",
      email: req.body.email || "",
      projectType: req.body.projectType || "General",
      message: req.body.message || "",
      createdAt: new Date().toISOString().split("T")[0],
    };
    inquiries.unshift(newInquiry);
    res.status(201).json({ success: true, inquiry: newInquiry });
  });

  // Settings API
  app.get("/api/settings", (_req, res) => {
    res.json(settings);
  });

  app.put("/api/settings", (req, res) => {
    settings = {
      ...settings,
      ...req.body,
    };
    res.json(settings);
  });

  // Vite middleware or Static Server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NWA Architects Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
