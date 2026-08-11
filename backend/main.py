"""
FastAPI Backend for NWA Architects Studio
Provides REST API endpoints for Projects, Job Postings, Candidate Applications, Contact Inquiries, and Studio Settings.
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

app = FastAPI(
    title="NWA Architects Studio API",
    description="Backend API handling architectural portfolio, candidate pipelines, and studio management.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Project(BaseModel):
    id: Optional[str] = None
    title: str
    category: str
    location: str
    year: int
    description: str
    imageUrl: str
    status: str = "In Progress"
    lastEdited: Optional[str] = "Just now"
    editedBy: Optional[str] = "Admin"

class JobPosting(BaseModel):
    id: Optional[str] = None
    title: str
    department: str
    location: str
    status: str = "Active"
    postedDate: str
    description: Optional[str] = None
    requirements: Optional[List[str]] = None

class Application(BaseModel):
    id: Optional[str] = None
    candidateName: str
    position: str
    appliedDate: str
    status: str = "New"
    email: str
    portfolioUrl: Optional[str] = ""
    avatarUrl: Optional[str] = ""
    experienceSummary: Optional[List[Dict[str, Any]]] = []
    attachments: Optional[List[Dict[str, Any]]] = []
    notes: Optional[str] = ""

class ContactInquiry(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    projectType: str
    message: str
    createdAt: Optional[str] = None

class StudioProfile(BaseModel):
    name: str
    registrationNumber: str
    hqAddress: str
    contactEmail: str
    phoneNumber: str

class TeamMember(BaseModel):
    id: str
    name: str
    role: str
    status: str
    initials: str
    email: Optional[str] = None

class StudioSettings(BaseModel):
    profile: StudioProfile
    team: List[TeamMember]
    security: Dict[str, bool]

# In-Memory Storage
projects_db: List[Project] = [
    Project(
        id="proj-1",
        title="Chhatrapati Square",
        category="Commercial",
        location="Kyoto, Japan",
        year=2023,
        description="A striking commercial intervention exploring the tension between monolithic concrete mass and lightwells.",
        imageUrl="https://lh3.googleusercontent.com/aida/AP1WRLvfdOA7-iFZuZbXcpSKwdIE3RXM_wJkyGNlPeyLqEJ4Nuyx1NUcUpU3bIkKMXdh46_JzDcpHpAskKclLYO0I3-fytfhWo4iHEDfCWGYb4JUmESGwiiq2hJO2f_DgXdzTy5RIKTK_bsSwdLESnqLfffZCZ_SCEKhqkcS_nXETEMzM5gwhKmvuKEEo_iq0hKKdF72o--rz-tp5FgbpsnEAFwLa8rzFy_lsMH2u3AY4paWIOBUI0aOrg0cqfLq",
        status="In Progress",
        lastEdited="2 hrs ago",
        editedBy="J. Doe"
    ),
    Project(
        id="proj-2",
        title="Ale Vividh Karyakari Society",
        category="Cultural",
        location="Pune, India",
        year=2022,
        description="Institutional cultural center utilizing locally sourced stone masonry and raw timber screens.",
        imageUrl="https://lh3.googleusercontent.com/aida/AP1WRLtAJBeGOIMGk6R3tUQp36wnju1dGJ5XO5bHlxuWGLmslLyZnjWN9oJqk__OrPWthZfdmTljxbxd2jCMxRy637Lu5ieu58l4ODs-OpJ7HDeaYdH5_q6__gXobH9steeuNBG1ygIQM3cysYF7KSYPxlcDcptPcFwD9yKJM-4lNs859UpewH0N0gx4_VKARBr2cRvrKVwL147hc-Z_18iFOIAX_k102-NwIbfl5KAyJu70V_qem7VGuZx2TNE",
        status="Concept Phase",
        lastEdited="1 day ago",
        editedBy="S. Smith"
    )
]

jobs_db: List[JobPosting] = [
    JobPosting(
        id="job-1",
        title="Senior Design Architect",
        department="Design",
        location="New York, NY",
        status="Active",
        postedDate="Oct 12, 2024",
        description="Lead design teams on monumental civic and commercial projects."
    )
]

applications_db: List[Application] = [
    Application(
        id="app-1",
        candidateName="Elias Thorne",
        position="Senior Design Architect",
        appliedDate="Oct 12, 2024",
        status="Reviewing",
        email="elias.thorne@example.com",
        portfolioUrl="eliasthorne-portfolio.com",
        notes="Outstanding portfolio focusing on monolithic concrete facades."
    )
]

inquiries_db: List[ContactInquiry] = []

settings_db = StudioSettings(
    profile=StudioProfile(
        name="NWA Architects",
        registrationNumber="AIA-49281-NY",
        hqAddress="Flat no. 3, 76-Shrushti Prabhat, lane no.-15, near symbiosis School, Prabhat road, Pune - 411004",
        contactEmail="nwa.architects2002@gmail.com",
        phoneNumber="+91 9850601673"
    ),
    team=[
        TeamMember(id="tm-1", name="Elias Hayes", role="Principal", status="Active", initials="EH"),
        TeamMember(id="tm-2", name="Sarah Chen", role="Senior Architect", status="Active", initials="SC")
    ],
    security={"twoFactorEnabled": False}
)

# Routes
@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "FastAPI NWA Architects Backend"}

@app.get("/api/projects", response_model=List[Project])
def get_projects():
    return projects_db

@app.post("/api/projects", response_model=Project, status_code=status.HTTP_201_CREATED)
def create_project(project: Project):
    project.id = f"proj-{int(datetime.now().timestamp())}"
    projects_db.insert(0, project)
    return project

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: str):
    global projects_db
    projects_db = [p for p in projects_db if p.id != project_id]
    return {"success": True, "id": project_id}

@app.get("/api/jobs", response_model=List[JobPosting])
def get_jobs():
    return jobs_db

@app.get("/api/applications", response_model=List[Application])
def get_applications():
    return applications_db

@app.get("/api/settings", response_model=StudioSettings)
def get_settings():
    return settings_db

@app.post("/api/inquiries", status_code=status.HTTP_201_CREATED)
def submit_inquiry(inquiry: ContactInquiry):
    inquiry.id = f"inq-{int(datetime.now().timestamp())}"
    inquiry.createdAt = datetime.now().strftime("%Y-%m-%d")
    inquiries_db.append(inquiry)
    return {"success": True, "inquiry": inquiry}
