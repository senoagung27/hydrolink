import { Job } from '../types/job';

export const mapApiDataToJob = (apiJob: any): Job => {
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
    } else if (companyName.includes('twitter')) {
        logoInfo = { logo: 'twitter', logoColor: '#1DA1F2', logoBackgroundColor: '#E7F5FE' };
    }
    const formatDateAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 1) return '1 day ago';
        return `${diffDays} days ago`;
    };
    return {
        id: apiJob.id,
        title: apiJob.title,
        company: apiJob.company,
        location: apiJob.location,
        tags: [apiJob.job_type, apiJob.position, apiJob.specialization].filter(Boolean),
        posted: formatDateAgo(apiJob.createdAt),
        salary: apiJob.salary,
        ...logoInfo,
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