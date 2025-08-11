export interface Job {
  id: string;
  logo: string; 
  logoUrl?: string;
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
  workplace_type?: string;
}

export type JobCardProps = {
  job: Job;
  onDelete: (jobId: string) => void;
  onUpdate: (job: Job) => void;
};