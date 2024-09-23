import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';

export default function MyMap({ region, marker }) {
    // Create a state for region


    return (
        <MapView
            style={{
                width: '100%',
                height: '80%',
            }}
            region={region}
        >
            {marker && (
                <Marker
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    }}
                />
            )}
        </MapView>
    )
}

