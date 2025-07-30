import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '../constants/Colors';

// Komponen untuk kartu informasi kecil (Gaji, Jenis Pekerjaan, Posisi)
export const InfoCard = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoCard}>
        <ThemedText style={styles.infoCardLabel}>{label}</ThemedText>
        <ThemedText style={styles.infoCardValue}>{value}</ThemedText>
    </View>
);

const styles = StyleSheet.create({
    infoCard: {
        backgroundColor: '#E6EBF5',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    infoCardLabel: {
        fontSize: 14,
        color: Colors.light.icon,
        marginBottom: 4,
    },
    infoCardValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E1E2D',
    },
});