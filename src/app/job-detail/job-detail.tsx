import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '../../components/ThemedText';
import { Colors } from '../../constants/Colors';
import { fetchJobById } from '../../api/apiJobs';
import { Job } from '../../types/job';
import { BulletPoint } from '../../components/BulletPoint';
import { InfoCard } from '../../components/InfoCard';
import { mapApiDataToJob } from '../../utils/jobUtils';

export default function JobDetailScreen() {
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    useEffect(() => {
        if (id) {
            const getJobDetails = async () => {
                try {
                    setLoading(true);
                    const jobData = await fetchJobById(id as string);
                    setJob(mapApiDataToJob(jobData));
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            getJobDetails();
        }
    }, [id]);
    
    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
    }
    if (!job) {
        return <View style={styles.centered}><ThemedText>Pekerjaan tidak ditemukan!</ThemedText></View>;
    }

    const descriptionText = isDescriptionExpanded
        ? job.description
        : `${job.description?.substring(0, 150)}...`;


    return (
        <View style={[styles.safeArea, { paddingTop: insets.top }]}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={[styles.logoContainer, { backgroundColor: job.logoBackgroundColor }]}>
                        <FontAwesome name={job.logo as any} size={40} color={job.logoColor} />
                    </View>
                    <ThemedText type="title" style={styles.jobTitleText}>{job.title}</ThemedText>
                    <ThemedText style={styles.companyLocation}>{job.company} • {job.location} • {job.posted}</ThemedText>
                </View>

                <View style={styles.infoCardsContainer}>
                    <InfoCard label="Salary" value={job.salary} />
                    <InfoCard label="Job Type" value={job.job_type ?? ''} />
                    <InfoCard label="Position" value={job.position ?? ''} />
                </View>

                <View style={styles.section}>
                    <ThemedText type="subtitle">Job Description</ThemedText>
                    <Text style={styles.description}>
                        {descriptionText}
                    </Text>
                    <TouchableOpacity onPress={toggleDescription} style={styles.readMoreButton}>
                        <Text style={styles.readMoreButtonText}>
                            {isDescriptionExpanded ? 'Read less' : 'Read more'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <ThemedText type="subtitle">Requirements</ThemedText>
                    {job.requirements?.map((item, index) => <BulletPoint key={index} text={item} />)}
                </View>
                
                <View style={styles.section}>
                    <ThemedText type="subtitle">Location</ThemedText>
                    <ThemedText style={styles.locationText}>Overlook Avenue, Belleville, NJ, USA</ThemedText>
                    <View style={styles.mapPlaceholder}>
                        <FontAwesome name="map-marker" size={40} style={styles.mapIcon} />
                        <ThemedText>Map View</ThemedText>
                    </View>
                </View>

                <View style={styles.section}>
                    <ThemedText type="subtitle">Informations</ThemedText>
                    <View style={styles.infoRow}><ThemedText style={styles.infoLabel}>Position</ThemedText><ThemedText style={styles.infoValue}>{job.position}</ThemedText></View>
                    <View style={styles.infoRow}><ThemedText style={styles.infoLabel}>Qualification</ThemedText><ThemedText style={styles.infoValue}>{job.qualification}</ThemedText></View>
                    <View style={styles.infoRow}><ThemedText style={styles.infoLabel}>Experience</ThemedText><ThemedText style={styles.infoValue}>{job.experience}</ThemedText></View>
                    <View style={styles.infoRow}><ThemedText style={styles.infoLabel}>Job Type</ThemedText><ThemedText style={styles.infoValue}>{job.job_type}</ThemedText></View>
                    <View style={styles.infoRow}><ThemedText style={styles.infoLabel}>Specialization</ThemedText><ThemedText style={styles.infoValue}>{job.specialization}</ThemedText></View>
                </View>

                <View style={styles.section}>
                    <ThemedText type="subtitle">Facilities and Others</ThemedText>
                    {job.facilities?.map((item, index) => <BulletPoint key={index} text={item} />)}
                </View>
            </ScrollView>
            <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>APPLY NOW</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
    container: { flex: 1, paddingHorizontal: 20 },
    header: { alignItems: 'center', paddingVertical: 20, marginBottom: 20 },
    logoContainer: { width: 80, height: 80, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16, backgroundColor: 'white', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1}, shadowOpacity: 0.1, shadowRadius: 2 },
    jobTitleText: { marginBottom: 8, textAlign: 'center' },
    companyLocation: { color: Colors.light.icon },
    section: { marginBottom: 24 },
    description: { marginTop: 8, fontSize: 15, lineHeight: 22, color: Colors.light.icon },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    infoLabel: { color: Colors.light.icon, fontSize: 15 },
    infoValue: { fontWeight: 'bold', fontSize: 15 },
    footer: { paddingHorizontal: 20, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#E0E0E0', backgroundColor: '#F8F9FA' },
    applyButton: { backgroundColor: '#1E1E2D', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
    applyButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    infoCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    locationText: {
        marginTop: 8,
        fontSize: 15,
        color: Colors.light.icon
    },
    mapPlaceholder: {
        height: 150,
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapIcon: {
        width: 40,
        height: 40,
        marginBottom: 8,
        tintColor: '#999'
    },
    readMoreButton: {
        alignSelf: 'flex-start',
        marginTop: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: '#E6EBF5',
        borderRadius: 12,
    },
    readMoreButtonText: {
        color: '#1E1E2D',
        fontWeight: 'bold',
    },
});