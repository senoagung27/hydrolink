// src/app/edit-job.tsx
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useLayoutEffect, useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { fetchJobById, updateJobApi } from '../api/apiJobs';
import { AddJobRow } from '../components/AddJobRow';
import { WorkplaceTypeModal } from '../components/WorkplaceTypeModal';
import { EmploymentTypeModal } from '../components/EmploymentTypeModal';
import { useJob } from '../context/JobContext';
import { Job } from '../types/job';
import { mapApiDataToJob } from '../utils/jobUtils';

export default function EditJobScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    // Ambil semua parameter dari URL
    const params = useLocalSearchParams<{ id: string, selectedPosition?: string, selectedLocation?: string, selectedCompany?: string, updatedDescription?: string }>();
    const { id } = params;
    
    const { refetchJobs, updateJob: updateJobInContext } = useJob();
    const [jobDetails, setJobDetails] = useState<Partial<Job>>({});
    const [loading, setLoading] = useState(true);
    const [isWorkplaceModalVisible, setWorkplaceModalVisible] = useState(false);
    const [isEmploymentModalVisible, setEmploymentModalVisible] = useState(false);
    
    const isInitialFetchDone = useRef(false);

    // Effect untuk mengambil data awal (hanya sekali)
    useEffect(() => {
        if (id && !isInitialFetchDone.current) {
            const getJobDetails = async () => {
                setLoading(true);
                try {
                    const jobData = await fetchJobById(id);
                    const mappedJob = mapApiDataToJob(jobData);
                    setJobDetails(mappedJob);
                    isInitialFetchDone.current = true;
                } catch (err) {
                    console.error("Gagal mengambil detail pekerjaan:", err);
                    Alert.alert('Error', 'Gagal mengambil detail pekerjaan.');
                } finally {
                    setLoading(false);
                }
            };
            getJobDetails();
        }
    }, [id]);

    // Effect untuk memperbarui state dari parameter navigasi
    useEffect(() => {
        if (!isInitialFetchDone.current) return;
        
        // Gunakan parameter dari URL untuk memperbarui state
        const { selectedPosition, selectedLocation, selectedCompany, updatedDescription } = params;

        setJobDetails(prevDetails => {
            const newDetails = { ...prevDetails };
            let updated = false;

            if (selectedPosition && newDetails.title !== selectedPosition) {
                newDetails.title = selectedPosition;
                updated = true;
            }
            if (selectedLocation && newDetails.location !== selectedLocation) {
                newDetails.location = selectedLocation;
                updated = true;
            }
            if (selectedCompany && newDetails.company !== selectedCompany) {
                newDetails.company = selectedCompany;
                updated = true;
            }
            if (typeof updatedDescription === 'string') {
                const decodedDescription = decodeURIComponent(updatedDescription);
                if (newDetails.description !== decodedDescription) {
                    newDetails.description = decodedDescription;
                    updated = true;
                }
            }

            return updated ? newDetails : prevDetails;
        });
        
    }, [params]); // Dengarkan semua perubahan parameter

    const setJobDetailValue = (field: keyof Job, value: string) => {
        setJobDetails(prevDetails => ({ ...prevDetails, [field]: value }));
    };

    const handleUpdateJob = useCallback(async () => {
        if (!jobDetails.title) {
            Alert.alert('Form Tidak Lengkap', 'Posisi pekerjaan wajib diisi (*).');
            return;
        }
        setLoading(true);
        const success = await updateJobApi(jobDetails as Job);
        setLoading(false);
        if (success) {
            updateJobInContext(jobDetails as Job);
            await refetchJobs();
            Alert.alert('Sukses', 'Pekerjaan berhasil diperbarui.');
            router.replace('/(tabs)'); 
        }
    }, [jobDetails, id, router, refetchJobs, updateJobInContext]);
    const handleUpdateJobRef = useRef(handleUpdateJob);
    useEffect(() => { handleUpdateJobRef.current = handleUpdateJob; });
    
    const headerLeft = useCallback(() => (
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
    ), [router]);

    const headerRight = useCallback(() => (
        loading && !isInitialFetchDone.current 
            ? <ActivityIndicator style={{ marginRight: 15 }} color="#F9774E" /> 
            : <TouchableOpacity onPress={() => handleUpdateJobRef.current()} style={styles.postButton}>
                  <Text style={styles.postButtonText}>Update</Text>
              </TouchableOpacity>
    ), [loading, handleUpdateJobRef]);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Edit Job',
            headerLeft,
            headerRight,
            headerStyle: { backgroundColor: '#FDFDFD', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 }
        });
    }, [navigation, headerLeft, headerRight]);

    if (loading && !isInitialFetchDone.current) {
        return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
    }
    
    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Edit a job</Text>
                
                <AddJobRow 
                    label="Job position*" 
                    value={jobDetails.title} 
                    onPress={() => router.push({ pathname: '/select-job-position', params: { ...params, source: 'edit-job' }})} 
                />
                <AddJobRow 
                    label="Type of workplace" 
                    value={jobDetails.workplace_type} 
                    onPress={() => setWorkplaceModalVisible(true)} 
                />
                <AddJobRow 
                    label="Job location" 
                    value={jobDetails.location} 
                    onPress={() => router.push({ pathname: `/edit-job-location`, params: { ...params }})}
                />
                <AddJobRow 
                    label="Company" 
                    value={jobDetails.company} 
                    onPress={() => router.push({ pathname: `/edit-job-company`, params: { ...params }})}
                />
                <AddJobRow 
                    label="Employment type" 
                    value={jobDetails.job_type} 
                    onPress={() => setEmploymentModalVisible(true)} 
                />
                <AddJobRow 
                    label="Description" 
                    value={jobDetails.description ? `${jobDetails.description.substring(0, 30)}...` : 'Add description'} 
                    onPress={() => router.push({
                        pathname: '/edit-job-description',
                        params: {
                            ...params,
                            currentDescription: jobDetails.description || '',
                            title: jobDetails.title || '',
                            company: jobDetails.company || '',
                            location: jobDetails.location || '',
                            workplace: jobDetails.workplace_type || ''
                        }
                    })}
                />
            </ScrollView>
            <WorkplaceTypeModal 
                visible={isWorkplaceModalVisible} 
                onClose={() => setWorkplaceModalVisible(false)} 
                currentValue={jobDetails.workplace_type || ''} 
                onSelect={(value) => setJobDetailValue('workplace_type', value)} 
            />
            <EmploymentTypeModal 
                visible={isEmploymentModalVisible} 
                onClose={() => setEmploymentModalVisible(false)} 
                currentValue={jobDetails.job_type || ''} 
                onSelect={(value) => setJobDetailValue('job_type', value)} 
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FDFDFD' },
    contentContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1E1E2D', marginBottom: 30 },
    closeButton: { marginLeft: 15, padding: 5 },
    closeButtonText: { fontSize: 24, color: '#1E1E2D' },
    postButton: { marginRight: 15 },
    postButtonText: { color: '#F9774E', fontSize: 16, fontWeight: 'bold' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDFDFD' },
});