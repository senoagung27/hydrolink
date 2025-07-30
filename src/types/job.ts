// src/types/job.ts
export interface Job {
    id: string;
    logo: string; // For FontAwesome icon name
    logoUrl?: string; // For the actual logo image URL from API
    title: string;
    company: string;
    location: string;
    tags: string[];
    posted: string;
    salary: string;
    logoBackgroundColor: string;
    logoColor: string;
    description?: string;
    requirements?: string[];
    facilities?: string[];
    experience?: string;
    qualification?: string;
    position?: string;
    job_type?: string;
    specialization?: string;
}

export type JobCardProps = {
  job: Job;
  onDelete: (jobId: string) => void;
  onUpdate: (job: Job) => void;
};