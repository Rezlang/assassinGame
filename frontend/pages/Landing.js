import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles.js';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Landing = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setValid] = useState(true);
    const [error, setError] = useState('');

    const handleGoogleLoginClick = () => {
        navigation.navigate('Home');
    };
    const handleRegisterClick = () => {
        navigation.navigate('SignUp');
    };

    const __doSignIn = async (email, password) => {
        try {
            if (!email || !password) {
                console.error('Email and password are required.');
                return;
            }

            let response = await auth().signInWithEmailAndPassword(email, password);
            if (response && response.user) {
                navigation.navigate('Home');
            } else {
                console.error('Authentication failed.');
            }
        } catch (e) {
            console.error('Authentication error:', e.message);
        }
    };

    return (
        <View style={styles.loginScrn}>
            <Text style={styles.title}>Assassin Game</Text>
            <View style={styles.loginContainer}>
                <View style={styles.inputRow}>
                    <Text style={styles.loginTextBox}>Email:</Text>
                    <TextInput
                        label={'Email'}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={styles.input}
                        placeholder="Enter your email"
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Text style={styles.loginTextBox}>Password:</Text>
                    <TextInput
                        label={'Password'}
                        secureTextEntry
                        autoCapitalize="none"
                        style={styles.input}
                        placeholder="Enter your password"
                        onChangeText={text => setPassword(text)}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.loginBtn, styles.loginGoogle]} onPress={handleGoogleLoginClick}>
                        <Text style={styles.buttonText}>Login with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.loginBtn, styles.loginBtnMargin]} onPress={() => __doSignIn(email, password)}>
                    <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={handleRegisterClick}>
                        <Text>Don't have an account? Register here.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Landing;
