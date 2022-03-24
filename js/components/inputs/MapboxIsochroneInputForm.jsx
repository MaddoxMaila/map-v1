import React, {useState} from 'react'

const MapboxIsochroneInputForm = ({data}) => {

    const [lat, setLat] = useState(data.latlng.lat)
    const [lng, setLng] = useState(data.latlng.lng)
    const [minutes, setMinutes] = useState(0)
    const [distance, setDistance] = useState(0)

    return(
        <div>
            <form className='mapbox-isochrone-form'>
                
            </form>
        </div>
    )
}

export default MapboxIsochroneInputForm