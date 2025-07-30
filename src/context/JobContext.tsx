// src/context/JobContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchJobs } from '../api/apiJobs';
import { Job } from '../types/job';

type ApiJob = {
  id: string;
  createdAt: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  position: string;
  specialization: string;
  salary: string;
  description: string;
  requirements: string[];
  facilities: string[];
  experience: string;
  qualification: string;
  logo: string;
};

type JobContextType = {
  jobs: Job[];
  loading: boolean;
  refetchJobs: () => Promise<void>; // Diubah menjadi non-optional
  deleteJob: (jobId: string) => void;
  updateJob: (job: Job) => void;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

const formatDateAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
};

const mapApiDataToJob = (apiJob: ApiJob): Job => {
  const companyName = apiJob.company.toLowerCase();
  let logoInfo = {
    logo: 'building-o',
    logoColor: '#687076',
    logoBackgroundColor: '#F0F0F0',
  };

  if (companyName.includes('google')) {
    logoInfo = { logo: 'google', logoColor: '#4285F4', logoBackgroundColor: '#FFFFFF' };
  } else if (companyName.includes('dribbble')) {
    logoInfo = { logo: 'dribbble', logoColor: '#EA4C89', logoBackgroundColor: '#FCEEF5' };
  } else if (companyName.includes('twitter') || companyName.includes('x corp')) {
    logoInfo = { logo: 'twitter', logoColor: '#1DA1F2', logoBackgroundColor: '#E7F5FE' };
  }

  return {
    id: apiJob.id,
    title: apiJob.title,
    company: apiJob.company,
    location: apiJob.location,
    tags: [apiJob.job_type, apiJob.position, apiJob.specialization].filter(Boolean),
    posted: formatDateAgo(apiJob.createdAt),
    salary: apiJob.salary,
    ...logoInfo,
    logoUrl: apiJob.logo,
    description: apiJob.description,
    requirements: apiJob.requirements,
    facilities: apiJob.facilities,
    experience: apiJob.experience,
    qualification: apiJob.qualification,
    position: apiJob.position,
    job_type: apiJob.job_type,
    specialization: apiJob.specialization,
  };
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const getJobs = async () => {
    try {
      setLoading(true);
      const data: ApiJob[] = await fetchJobs() as any;
      const mappedJobs = data.map(mapApiDataToJob);
      setJobs(mappedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const deleteJob = (jobId: string) => {
    setJobs(currentJobs => currentJobs.filter(job => job.id !== jobId));
  };

  const updateJob = (updatedJob: Job) => {
    setJobs(currentJobs =>
      currentJobs.map(job => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  return (
    <JobContext.Provider value={{ jobs, loading, refetchJobs: getJobs, deleteJob, updateJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error('useJob must be used within a JobProvider');
  return context;
};