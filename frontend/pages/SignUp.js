import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isValid, setValid] = useState(true);

    const __doSignUp = () => {
        if (!email) {
            setError('Email required *');
            setValid(false);
            return;
        } else if (!password && password.trim() && password.length > 6) {
            setError('Weak password, minimum 5 chars');
            Alert.alert('Erorr', 'Password should be atleast 5 characters long.');
            setValid(false);
            return;
        }
        __doCreateUser(email, password);
    };

    const __doCreateUser = async (email, password) => {
        navigation.navigate('Home');
        return;
    };

    return (
        <View style={styles.loginScrn}>
            <Text style={styles.title}>Assassin Game</Text>
            <Text style={styles.subTitle}>Create an Account</Text>

            <View style={styles.loginContainer}>
                <View style={styles.inputRow}>
                    <Text style={styles.loginTextBox}>Email:</Text>
                    <TextInput
                        label={'Email'}
                        autoCapitalize={false}
                        keyboardType="email-address"
                        style={styles.input}
                        placeholder="Enter your email"
                        onChangeText={text => {
                            setError;
                            setEmail(text);
                        }}
                        error={isValid}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Text style={styles.loginTextBox}>Password:</Text>
                    <TextInput
                        label={'Password'}
                        secureTextEntry
                        autoCapitalize={false}
                        style={styles.input}
                        selectionColor={'blue'}
                        placeholder="Enter your password"
                        error={isValid}
                        onChangeText={text => setPassword(text)}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.loginBtn, styles.loginBtnMargin]}>
                        <Text style={styles.buttonText} onPress={__doSignUp}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default SignUp;