import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { homepageStyles } from '../styles.js'
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
    const [userEmail, setUserEmail] = useState('');
    
    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            setUserEmail(user.email);
        }
    }, []);

    const handleKill = () => {
        Alert.alert('Kill action clicked!');
    };

    const handleAction = () => {
        Alert.alert('Action button clicked!');
    };

    const handleLogout = () => {
        auth().signOut().then(() => {
            Alert.alert('Logged out');
        }).catch((error) => {
            Alert.alert('Logout failed', error.message);
        });
    };

    return (
        <View style={homepageStyles.container}>
            <View style={homepageStyles.header}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={homepageStyles.logoutText}>Logout</Text>
                </TouchableOpacity>
                <Text style={homepageStyles.userText}>User: {userEmail || 'Placeholder'}</Text>
            </View>

            <Text style={homepageStyles.targetText}>Target: ________</Text>
            
            <View style={homepageStyles.killButton}>
            <TouchableOpacity style={homepageStyles.button} onPress={handleKill}>
                <Text style={homepageStyles.buttonText}>Kill</Text>
            </TouchableOpacity>
            </View>
            <View style={homepageStyles.actionButton}>
            <TouchableOpacity style={homepageStyles.button} onPress={handleAction}>
                <Text style={homepageStyles.buttonText}>Action</Text>
            </TouchableOpacity>
            </View>

        </View>
    );
};

export default HomeScreen;
