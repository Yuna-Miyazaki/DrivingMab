import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Location = {
    latitude: number;
    longitude: number;
};

type MapPageProps = {
    currentLocation: Location | null;
};

function MoveToCurrentLocationButton({ currentLocation }: MapPageProps) {
    const map = useMap();

    const moveToCurrentLocation = () => {
        if (!currentLocation) return;

        map.flyTo(
            [currentLocation.latitude, currentLocation.longitude],
            16
        );
    };

    return (
        <button
            onClick={moveToCurrentLocation}
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1000,
            }}
        >
            現在地へ戻る
        </button>
    );
}

function MapPage({ currentLocation }: MapPageProps) {
    if (!currentLocation) {
        return <p>現在地を取得中です...</p>;
    }

    return (
        <div style={{ position: 'relative', height: '500px', width: '100%' }}>
            <MapContainer
                center={[currentLocation.latitude, currentLocation.longitude]}
                zoom={16}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={[
                        currentLocation.latitude,
                        currentLocation.longitude,
                    ]}
                />

                <MoveToCurrentLocationButton
                    currentLocation={currentLocation}
                />
            </MapContainer>
        </div>
    );
}

export default MapPage;