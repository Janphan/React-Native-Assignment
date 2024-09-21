import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
export default function MyMap({ region, marker }) {
    // Create a state for region


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
            > {marker && (
                <Marker
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    }}
                > <Callout>
                        <Text>{marker.display_name}</Text> {/* Wrapping display_name in Text */}
                    </Callout>
                </Marker>
            )}

            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});