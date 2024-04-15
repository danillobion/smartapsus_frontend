import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

interface MapaProps {
  markers: { lat: number, lng: number }[];
}

const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [13, 0],
  });

const Mapa: React.FC<MapaProps> = ({ markers }) => {
    useEffect(() => {
        const updateMapHeight = () => {
            let mapElement = document.getElementById('map');
            let height = window.innerHeight - 50; // -50 representa a altura do menu superior
            if (mapElement) {
                mapElement.style.height = height + 'px';
            }
        };

        updateMapHeight();
        window.addEventListener('resize', updateMapHeight);

        return () => {
            window.removeEventListener('resize', updateMapHeight);
        };
    }, []);

    return (
        <div id="map" style={{ height: '100vh', width: '100%' }}>
            <MapContainer style={{ height: '100%', width: '100%', zIndex:'0' }} center={[-17.01,-60.73]} zoom={4}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {markers.map((marker,index) => (
                  <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
                    <Popup>
                        {marker.legenda}
                    </Popup>
                </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Mapa;
