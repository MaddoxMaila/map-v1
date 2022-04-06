import React, {useState} from 'react'

const BufferInputForm = ({inputs}) => {

    const [lat, setLat] = useState(inputs.latlng.lat)
    const [lng, setLng] = useState(inputs.latlng.lng)
    const [distance, setDistance] = useState(0)
    const [segments, setSegments] = useState(0)

    return (
        <div>
            <form className="">
                <div className="input-group">
                    <label>Latitude</label>
                    <input type="text" className="form-control" onChange={(e) => {setLat(e.target.value)}} placeholder="Latitude" value={inputs.latlng.lat}/> 
                </div>
                <br />
                <div className="input-group">
                    <label>Longitude</label>
                    <input type="text" className="form-control" onChange={(e) => {setLng(e.target.value)}} placeholder="Longitude" value={inputs.latlng.lng}/> 
                </div>
                <br />
                <div className="input-group">
                    <label>Distance</label>
                    <input type="text" className="form-control" onChange={(e) => {setDistance(e.target.value)}} placeholder="Buffer Distance" value={distance} /> 
                </div>
                <br />
                <div className="input-group">
                    <label>Flat, Round or Square</label>
                    <input type="text" className="form-control" onChange={(e) => {setSegments(e.target.value)}} placeholder="Flat, Round, Square?" value={segments}/> 
                </div>
                <br />
            </form>
            <center>
            <button  onClick={() => {
                console.log('Form Send!')

                inputs.onsubmit({
                    lat,
                    lng,
                    distance,
                    segments
                })

                }} className='btn btn-primary req-btn'>{inputs.buttonText}</button>
            </center>
        </div>
    )

}

export default BufferInputForm