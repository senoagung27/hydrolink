import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definisikan tipe untuk detail pekerjaan
interface JobDetails {
    job_position: string;
    workplace_type: string;
    job_location: string;
    company: string;
    employment_type: string;
    description: string;
}

// Definisikan tipe untuk konteks
interface AddJobContextType {
    jobDetails: JobDetails;
    setJobDetail: (field: keyof JobDetails, value: string) => void;
    resetJobDetails: () => void;
}

// Buat konteks
const AddJobContext = createContext<AddJobContextType | undefined>(undefined);

// State awal
const initialState: JobDetails = {
    job_position: '',
    workplace_type: '',
    job_location: '',
    company: '',
    employment_type: '',
    description: '',
};

// Buat provider untuk konteks
export const AddJobProvider = ({ children }: { children: ReactNode }) => {
    const [jobDetails, setJobDetails] = useState<JobDetails>(initialState);

    const setJobDetail = (field: keyof JobDetails, value: string) => {
        setJobDetails(prevDetails => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const resetJobDetails = () => {
        setJobDetails(initialState);
    };

    return (
        <AddJobContext.Provider value={{ jobDetails, setJobDetail, resetJobDetails }}>
            {children}
        </AddJobContext.Provider>
    );
};

// Buat custom hook untuk menggunakan konteks
export const useAddJob = () => {
    const context = useContext(AddJobContext);
    if (!context) {
        throw new Error('useAddJob must be used within an AddJobProvider');
    }
    return context;
};