import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Home, Search, User } from 'lucide-react-native';

export default function InGameNavbar() {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>{"whatever we do for a logo at some point"}</Text>
                <Text style={styles.gameTitle}>Assassin Game</Text>
            </View>
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
                    <Home size={18} color="white" style={styles.icon} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.navItem}>
                    <Search size={18} color="white" style={styles.icon} />
                    <Text style={styles.navText}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navItem}>
                    <User size={18} color="white" style={styles.icon} />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 16,
    },
    logo: {
        flexDirection: 'column',
    },
    logoText: {
        color: 'white',
        fontSize: 12,
        fontStyle: 'italic',
    },
    gameTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    icon: {
        marginRight: 5,
    },
    navText: {
        color: 'white',
        fontSize: 16,
    },
});