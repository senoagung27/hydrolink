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
    const { id } = useLocalSearchParams();
    const { refetchJobs, updateJob: updateJobInContext } = useJob();
    const [jobDetails, setJobDetails] = useState<Partial<Job>>({});
    const [loading, setLoading] = useState(true);
    const [isWorkplaceModalVisible, setWorkplaceModalVisible] = useState(false);
    const [isEmploymentModalVisible, setEmploymentModalVisible] = useState(false);

    useEffect(() => {
        if (id) {
            const getJobDetails = async () => {
                setLoading(true);
                try {
                    const jobData = await fetchJobById(id as string);
                    setJobDetails(mapApiDataToJob(jobData));
                } catch (err) {
                    console.error(err);
                    Alert.alert('Error', 'Gagal mengambil detail pekerjaan.');
                } finally {
                    setLoading(false);
                }
            };
            getJobDetails();
        } else {
            setLoading(false);
        }
    }, [id]);

    const setJobDetail = (field: keyof Job, value: string) => {
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
            if (router.canGoBack()) router.back();
        }
    }, [jobDetails, id, router, refetchJobs, updateJobInContext]);

    const handleUpdateJobRef = useRef(handleUpdateJob);
    useEffect(() => { handleUpdateJobRef.current = handleUpdateJob; });
    const headerLeft = useCallback(() => (<TouchableOpacity onPress={() => router.back()} style={styles.closeButton}><Text style={styles.closeButtonText}>✕</Text></TouchableOpacity>), [router]);
    const headerRight = useCallback(() => (loading ? <ActivityIndicator style={{ marginRight: 15 }} color="#F9774E" /> : <TouchableOpacity onPress={() => handleUpdateJobRef.current()} style={styles.postButton}><Text style={styles.postButtonText}>Update</Text></TouchableOpacity>), [loading]);
    useLayoutEffect(() => { navigation.setOptions({ headerShown: true, headerTitle: 'Edit Job', headerLeft, headerRight, headerStyle: { backgroundColor: '#FDFDFD', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 } }); }, [navigation, headerLeft, headerRight]);

    if (loading) return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
    
    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Edit a job</Text>
                <AddJobRow label="Job position*" value={jobDetails.title} onPress={() => {}} />
                <AddJobRow label="Type of workplace" value={jobDetails.workplace_type} onPress={() => setWorkplaceModalVisible(true)} />
                <AddJobRow label="Job location" value={jobDetails.location} onPress={() => {}} />
                <AddJobRow label="Company" value={jobDetails.company} onPress={() => {}} />
                <AddJobRow label="Employment type" value={jobDetails.job_type} onPress={() => setEmploymentModalVisible(true)} />
                <AddJobRow label="Description" value={jobDetails.description ? `${jobDetails.description.substring(0, 30)}...` : 'Add description'} onPress={() => {}} />
            </ScrollView>
            <WorkplaceTypeModal visible={isWorkplaceModalVisible} onClose={() => setWorkplaceModalVisible(false)} currentValue={jobDetails.workplace_type || ''} onSelect={(value) => setJobDetail('workplace_type' as keyof Job, value)} />
            <EmploymentTypeModal visible={isEmploymentModalVisible} onClose={() => setEmploymentModalVisible(false)} currentValue={jobDetails.job_type || ''} onSelect={(value) => setJobDetail('job_type' as keyof Job, value)} />
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