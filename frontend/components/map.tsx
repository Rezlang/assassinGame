import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

interface MapProps {
  apiKey: "AIzaSyCYkxzteqX5FOXCUVfYeFuB6RNLHc7F5cs";
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({
  apiKey,
  center = { lat: 40.7128, lng: -74.0060 }, // Default to NYC
  zoom = 12
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    // Get user's location when map loads
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          map.panTo(location);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleRecenter = () => {
    if (userLocation && map) {
      map.panTo(userLocation);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="relative" >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
      
      {userLocation && (
        <button 
          onClick={handleRecenter}
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            borderRadius: '9999px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}
        >
          Recenter
        </button>
      )}
    </div>
  );
};

export default Map;