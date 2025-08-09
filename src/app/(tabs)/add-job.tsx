// src/app/(tabs)/add-job.tsx
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useLayoutEffect, useState, useCallback, useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { addJob } from '../../api/apiJobs';
import { AddJobRow } from '../../components/AddJobRow';
import { WorkplaceTypeModal } from '../../components/WorkplaceTypeModal'; // Import modal
import { useJob } from '../../context/JobContext';

export default function AddJobScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { refetchJobs } = useJob();
    const [loading, setLoading] = useState(false);
    const [isWorkplaceModalVisible, setWorkplaceModalVisible] = useState(false);

    const [jobDetails, setJobDetails] = useState({
        job_position: '',
        workplace_type: '',
        job_location: '',
        company: '',
        employment_type: '',
        description: '',
    });

    const jobDetailsRef = useRef(jobDetails);
    useEffect(() => {
        jobDetailsRef.current = jobDetails;
    }, [jobDetails]);
     
    const handleUpdateDetail = useCallback((key: keyof typeof jobDetails, value: string) => {
        setJobDetails(prev => ({ ...prev, [key]: value }));
    }, []);
     
    useEffect(() => {
        const { field_key, field_value } = params;
        if (typeof field_key === 'string' && typeof field_value === 'string' && Object.keys(jobDetails).includes(field_key)) {
            handleUpdateDetail(field_key as keyof typeof jobDetails, field_value);
        }
    }, [params, handleUpdateDetail]);

    const handlePostJob = useCallback(async () => {
        const currentJobDetails = jobDetailsRef.current; 
        if (!currentJobDetails.job_position) {
            Alert.alert('Incomplete Form', 'Job Position is required (*).');
            return;
        }

        setLoading(true);
        const newJobData = {
            title: currentJobDetails.job_position,
            company: currentJobDetails.company || 'Not specified',
            job_type: currentJobDetails.employment_type || 'Full-Time',
            location: currentJobDetails.job_location || 'Remote',
            description: currentJobDetails.description || 'No description provided.',
            requirements: ["Minimum 2 years of experience in a similar role."],
            salary: "$55,000 - $70,000",
            facilities: ["Medical Insurance", "Paid Time Off"],
            position: "Senior",
            specialization: "Product Design"
        };

        const result = await addJob(newJobData);
        setLoading(false);

        if (result) {
            await refetchJobs();
            if (router.canGoBack()) {
                router.back();
            }
        }
    }, [refetchJobs, router]);

    const headerLeft = useCallback(() => (
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
    ), [router]);

    const headerRight = useCallback(() => (
        loading ? (
            <ActivityIndicator style={{ marginRight: 15 }} color="#F9774E" />
        ) : (
            <TouchableOpacity onPress={handlePostJob} style={styles.postButton}>
                <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
        )
    ), [loading, handlePostJob]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: '', 
            headerLeft,
            headerRight,
            headerStyle: {
                backgroundColor: '#FDFDFD',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
        });
    }, [navigation, headerLeft, headerRight]);

    const handleFieldPress = (field: keyof typeof jobDetails, title: string) => {
        const currentParams = { field_key: field };
         
        switch (field) {
            case 'job_position':
                router.push({ pathname: '/select-job-position', params: currentParams });
                break;
            case 'company':
                router.push({ pathname: '/select-company' as any, params: currentParams });
                break;
           case 'workplace_type':
               setWorkplaceModalVisible(true);
               break;
            default:
                Alert.prompt(
                    `Enter ${title}`,
                    `Please provide a value for ${title}.`,
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK',
                            onPress: (text) => {
                                if (text) handleUpdateDetail(field, text);
                            }
                        },
                    ],
                    'plain-text',
                    jobDetails[field]
                );
                break;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Add a job</Text>

                <AddJobRow
                    label="Job position*"
                    value={jobDetails.job_position}
                    onPress={() => handleFieldPress('job_position', 'Job Position')}
                />
                <AddJobRow
                    label="Type of workplace"
                    value={jobDetails.workplace_type}
                    onPress={() => handleFieldPress('workplace_type', 'Workplace Type')}
                />
                <AddJobRow
                    label="Job location"
                    value={jobDetails.job_location}
                    onPress={() => handleFieldPress('job_location', 'Job Location')}
                />
                <AddJobRow
                    label="Company"
                    value={jobDetails.company}
                    onPress={() => handleFieldPress('company', 'Company')}
                />
                <AddJobRow
                    label="Employment type"
                    value={jobDetails.employment_type}
                    onPress={() => handleFieldPress('employment_type', 'Employment Type')}
                />
                <AddJobRow
                    label="Description"
                    value={jobDetails.description}
                    onPress={() => handleFieldPress('description', 'Description')}
                />
            </ScrollView>

           <WorkplaceTypeModal
               visible={isWorkplaceModalVisible}
               onClose={() => setWorkplaceModalVisible(false)}
               currentValue={jobDetails.workplace_type}
               onSelect={(value) => {
                   handleUpdateDetail('workplace_type', value);
               }}
           />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FDFDFD',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E1E2D',
        marginBottom: 30,
    },
    closeButton: {
        marginLeft: 15,
        padding: 5,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#1E1E2D',
    },
    postButton: {
        marginRight: 15,
    },
    postButtonText: {
        color: '#F9774E',
        fontSize: 16,
        fontWeight: 'bold',
    },
});