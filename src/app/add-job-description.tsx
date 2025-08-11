// src/app/add-job-description.tsx
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '../components/ThemedText';
import { useAddJob } from '../context/AddJobContext';
import { COMPANIES } from '../constants/companies';

/**
 * A custom component to display the job details in a card format,
 * embedded within the description screen, as shown in the image.
 */
const EmbeddedJobCard = ({
    title,
    company,
    location,
    workplace,
}: {
    title: string;
    company: string;
    location: string;
    workplace: string;
}) => {
    // Find company details to get the correct logo and color
    const companyInfo = COMPANIES.find((c) => c.name.toLowerCase() === company.toLowerCase());
    const logoName = companyInfo?.logo ?? 'building-o';
    const logoColor = companyInfo?.color ?? '#000000';
    const isApple = company.toLowerCase().includes('apple');

    return (
        <View style={styles.embeddedCard}>
            <View style={styles.cardHeader}>
                <View style={[styles.logoContainer, isApple && { backgroundColor: '#000000' }]}>
                    <FontAwesome name={logoName as any} size={30} color={isApple ? '#FFFFFF' : logoColor} />
                </View>
                <View style={styles.jobInfo}>
                    <Text style={styles.jobTitle}>{title || 'UI/UX Designer'}</Text>
                    <Text style={styles.jobCompany} numberOfLines={1}>
                        Job vacancies from {company || 'Apple company'}
                    </Text>
                    <Text style={styles.jobLocation} numberOfLines={1}>
                        {location || 'California, USA'} &middot; {workplace || 'On-site'}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.applicationButton}>
                <Text style={styles.applicationButtonText}>Application details</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function AddJobDescriptionScreen() {
    const router = useRouter();
    const { jobDetails, setJobDetail, resetJobDetails } = useAddJob();

    // The "Post" action.
    const handlePost = () => {
        // In a real app, this would trigger the final job posting logic.
        console.log('Posting job with details:', jobDetails);
        // After posting, reset the form and navigate away.
        resetJobDetails();
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePost}>
                    <Text style={styles.postButton}>Post</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText type="title" style={styles.pageTitle}>
                    Shared a Job
                </ThemedText>
                <View style={styles.userInfoContainer}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=orlando' }} // Using a placeholder for the avatar
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.userName}>Orlando Diggs</Text>
                        <Text style={styles.userLocation}>California, USA</Text>
                    </View>
                </View>

                <ThemedText style={styles.sectionTitle}>Description</ThemedText>

                {/* The main card containing the description and the embedded job card */}
                <View style={styles.descriptionCard}>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        placeholder="Hey guys..."
                        value={jobDetails.description}
                        onChangeText={(text) => setJobDetail('description', text)}
                        defaultValue={`Today I am opening a job vacancy in the field of UI/UX Designer at an Apple company. To see a job description, please see below:`}
                    />
                    <EmbeddedJobCard
                        title={jobDetails.job_position}
                        company={jobDetails.company}
                        location={jobDetails.job_location}
                        workplace={jobDetails.workplace_type}
                    />
                </View>
            </ScrollView>

            {/* Bottom toolbar for actions */}
            <View style={styles.bottomToolbar}>
                <View style={styles.toolbarActions}>
                    <TouchableOpacity>
                        <FontAwesome name="camera" size={24} color="#687076" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="image" size={24} color="#687076" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style={styles.addHashtag}>Add hashtag</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F9', // Light grey background from image
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#F4F5F9',
    },
    postButton: {
        color: '#8A84E2', // Purple-ish color from image
        fontWeight: 'bold',
        fontSize: 16,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    userLocation: {
        fontSize: 14,
        color: '#687076',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    descriptionCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
    },
    textInput: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        minHeight: 100,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    embeddedCard: {
        backgroundColor: '#F4F5F9', // Slightly different background
        borderRadius: 12,
        padding: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFFFFF', // Default white background
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#EFEFEF'
    },
    jobInfo: {
        flex: 1,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    jobCompany: {
        fontSize: 14,
        color: '#687076',
        marginTop: 2,
    },
    jobLocation: {
        fontSize: 14,
        color: '#687076',
        marginTop: 2,
    },
    applicationButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        paddingVertical: 10,
        alignItems: 'center',
    },
    applicationButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    bottomToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    toolbarActions: {
        flexDirection: 'row',
        gap: 25,
    },
    addHashtag: {
        color: '#8A84E2',
        fontWeight: 'bold'
    }
});