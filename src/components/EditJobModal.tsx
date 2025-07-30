import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Job } from '../types/job';

interface EditJobModalProps {
    visible: boolean;
    onClose: () => void;
    onUpdate: (job: Job) => void;
    job: Job;
}

export const EditJobModal = ({ visible, onClose, onUpdate, job }: EditJobModalProps) => {
    const [editedJob, setEditedJob] = useState<Job>(job);

    useEffect(() => {
        setEditedJob(job);
    }, [job, visible]);

    const handleUpdate = () => {
        onUpdate(editedJob);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.editModalContent}>
                    <Text style={styles.modalTitle}>Edit Job</Text>
                    <TextInput
                        placeholder="Job Title"
                        style={styles.input}
                        value={editedJob.title}
                        onChangeText={(text) => setEditedJob({ ...editedJob, title: text })}
                    />
                    <TextInput
                        placeholder="Company"
                        style={styles.input}
                        value={editedJob.company}
                        onChangeText={(text) => setEditedJob({ ...editedJob, company: text })}
                    />
                    <TextInput
                        placeholder="Location"
                        style={styles.input}
                        value={editedJob.location}
                        onChangeText={(text) => setEditedJob({ ...editedJob, location: text })}
                    />
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCancel]}
                            onPress={onClose}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonUpdate]}
                            onPress={handleUpdate}>
                            <Text style={styles.textStyle}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    editModalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonCancel: {
        backgroundColor: '#E0E0E0',
    },
    buttonUpdate: {
        backgroundColor: '#1DA1F2',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});