import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

interface LocationType {
    latitude: number;
    longitude: number;
}

const Map = ({ initialRegion = {
    latitude: 40.7128,  // Default to NYC
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
} }) => {
    const [userLocation, setUserLocation] = useState<LocationType | null>(null);
    const [mapRef, setMapRef] = useState<MapView | null>(null);

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const userLoc: LocationType = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setUserLocation(userLoc);
            
            if (mapRef) {
                const region: Region = {
                    ...userLoc,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };
                mapRef.animateToRegion(region);
            }
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    const handleRecenter = () => {
        if (userLocation && mapRef) {
            const region: Region = {
                ...userLocation,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            mapRef.animateToRegion(region);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={(ref) => setMapRef(ref)}
                style={styles.map}
                initialRegion={initialRegion}
            >
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        title="You are here"
                        pinColor="#4285F4"
                    />
                )}
            </MapView>
            
            {userLocation && (
                <TouchableOpacity
                    onPress={handleRecenter}
                    style={styles.recenterButton}
                >
                    <Text style={styles.recenterText}>Recenter</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 400,
        width: Dimensions.get('window').width,
        position: 'relative'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    recenterButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    recenterText: {
        color: '#4285F4'
    }
});

export default Map;