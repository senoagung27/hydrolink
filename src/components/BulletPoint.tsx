import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '../constants/Colors';

// Komponen untuk menampilkan poin-poin dengan bullet
export const BulletPoint = ({ text }: { text: string }) => (
    <View style={styles.bulletPointContainer}>
        <Text style={styles.bullet}>•</Text>
        <ThemedText style={styles.bulletText}>{text}</ThemedText>
    </View>
);

const styles = StyleSheet.create({
    bulletPointContainer: { 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        marginTop: 8 
    },
    bullet: { 
        fontSize: 16, 
        marginRight: 8, 
        color: Colors.light.icon, 
        lineHeight: 22 
    },
    bulletText: { 
        flex: 1, 
        color: Colors.light.icon, 
        fontSize: 15, 
        lineHeight: 22 
    },
});