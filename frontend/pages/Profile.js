import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../components/AuthProvider.js'
import auth from '@react-native-firebase/auth';

const Profile = () => {
    const { user, signOut } = useAuth();
    const [userEmail, setUserEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [gameID, setGameID] = useState('');

    useEffect(async () => {
        const user = auth().currentUser;
        if (user) {
            setUserEmail(user.email);
            setUserID(user.uid);
        }
        const fetchGameId = async () => {
            const storedGameId = await AsyncStorage.getItem('game_id');
            setGameID(storedGameId);
        };

        fetchGameId();
    }, []);

    const handleLogout = () => {
        signOut().then(() => {
            Alert.alert('Logged out');

        }).catch((error) => {
            Alert.alert('Logout failed', error.message);
        });
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Profile</Text>
          <Text style={styles.subTitle}>This page is under development.</Text>
          <View style={styles.userInfoContainer}>
            <Text style={styles.infoText}>User: {userEmail || 'Placeholder'}</Text>
            <Text style={styles.infoText}>Current Game: {gameID || 'No active game'}</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutBtnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#282c34',
        alignItems: 'center',
        paddingTop: 50,
      },
      title: {
        color: 'white',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
      },
      subTitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
      },
      userInfoContainer: {
        alignItems: 'flex-start',
        width: '80%',
        marginBottom: 30,
      },
      infoText: {
        color: 'aliceblue',
        fontSize: 18,
        marginBottom: 10,
      },
      logoutBtn: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        width: '80%',
        alignItems: 'center',
      },
      logoutBtnTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });

export default Profile;
