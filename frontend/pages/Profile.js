import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../components/AuthProvider.js'
import auth from '@react-native-firebase/auth';

const Profile = () => {
    const { user, signOut } = useAuth();
    const [userEmail, setUserEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [target, setTarget] = useState('');
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

        const cachedTarget = await getCachedTarget();
        if (!cachedTarget) {
            await getTarget(); // Only call the backend if no cached target is found
        } else {
            setTarget(cachedTarget);
            Alert.alert('Cached Target Loaded', `Target: ${cachedTarget}`);
        }
    }, []);

    const handleLogout = () => {
        signOut().then(() => {
            Alert.alert('Logged out');

        }).catch((error) => {
            Alert.alert('Logout failed', error.message);
        });
    };

    return (
        <View>
            <Text>Welcome to Profile</Text>
            <Text>This is the temporary profile page.</Text>
            <View style={homepageStyles.header}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={homepageStyles.logoutText}>Logout</Text>
                </TouchableOpacity>
                <Text style={homepageStyles.userText}>User: {userEmail || 'Placeholder'}</Text>
                <Text>Current Game: {gameID || 'No active game'} </Text>
            </View>
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

export default Profile;
