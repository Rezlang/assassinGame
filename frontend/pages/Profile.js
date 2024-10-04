import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Temporary Home component
const HomeScreen = () => {
    return (
        <View>
            <Text>Welcome to Profile</Text>
            <Text>This is the temporary profile page.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
});

export default HomeScreen;
