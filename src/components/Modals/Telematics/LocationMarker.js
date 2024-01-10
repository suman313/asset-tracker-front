import { useEffect } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"

export default function LocationMarker({position, setPosition}) {
    // const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    useEffect(() => {
      // Update the map when new latitude and longitude data are received
      if (position) {
        map.flyTo(position, map.getZoom());
      }
      console.log(position);
    }, [position, map]);
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }