// src/context/JobContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchJobs } from '../api/apiJobs';
import { Job } from '../types/job';
import { mapApiDataToJob } from '../utils/jobUtils';

type JobContextType = {
  jobs: Job[];
  loading: boolean;
  refetchJobs: () => Promise<void>;
  deleteJob: (jobId: string) => void;
  updateJob: (job: Job) => void;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const getJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();
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
    const mappedUpdatedJob = mapApiDataToJob(updatedJob);
    setJobs(currentJobs =>
      currentJobs.map(job => (job.id === mappedUpdatedJob.id ? mappedUpdatedJob : job))
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