import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import L, { Map } from 'leaflet'

//Fix default marker icon bug
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const ClickHandler = ({onMapClick}) => {
    return(
     <MapContainer
     center={[20.5937,78.9629]}
     zoom={5}
     style={{height:'100vh',width:'100%'}}>

        <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onMapClick={onMapClick} />
      {journals.map((journal) => (
        <Marker
          key={journal._id}
          position={[
            journal.location.coordinates[1],
            journal.location.coordinates[0]
          ]}
        > <Popup>
            <b> {new Date(journal.date).toLocaleDateString()}</b>
            <p>{journal.text}</p>
            </Popup>
            </Marker>
        ))}
     </MapContainer>
    )
}

export default MapView