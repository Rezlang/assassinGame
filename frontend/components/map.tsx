import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// Add explicit type definitions since DOM types aren't available
interface GeolocationCoordinates {
  readonly latitude: number;
  readonly longitude: number;
  readonly altitude: number | null;
  readonly accuracy: number;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly speed: number | null;
}

interface GeolocationPosition {
  readonly coords: GeolocationCoordinates;
  readonly timestamp: number;
}

interface GeolocationPositionError {
  readonly code: number;
  readonly message: string;
  readonly PERMISSION_DENIED: number;
  readonly POSITION_UNAVAILABLE: number;
  readonly TIMEOUT: number;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

const buttonStyle = {
  position: 'absolute' as const,
  bottom: '1rem',
  right: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  borderRadius: '9999px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  border: 'none',
  transition: 'box-shadow 0.2s ease'
};

interface MapProps {
  apiKey: string;
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
  const [isHovered, setIsHovered] = useState(false);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    // Get user's location when map loads
    if (typeof window !== 'undefined' && window.navigator && 'geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          map.panTo(location);
        },
        (error: GeolocationPositionError) => {
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
    <div style={{ position: 'relative' }}>
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
              path: google.maps.SymbolPath.CIRCLE,
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            ...buttonStyle,
            boxShadow: isHovered ? '0 4px 6px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Recenter
        </button>
      )}
    </div>
  );
};

export default Map;