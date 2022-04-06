import React, {useState} from 'react'
import {drivetimeUniqueIdentifierError} from '@js/lib/errorHandlers/mapboxFormErrorHandlers'

const MapboxIsochroneInputForm = (props) => {

    console.log(props.inputs.latlng)

    const [lat, setLat] = useState(props.inputs.latlng.lat)
    const [lng, setLng] = useState(props.inputs.latlng.lng)
    const [minutes, setMinutes] = useState(0)
    const [distance, setDistance] = useState(0)
    const [polygons, setPolygons] = useState(false)
    const [drivetimeUniqueIdentifier, setDrivetimeUniqueIdentifier] = useState("")
    const [saveLayer, setSaveLayer] = useState("no")
    const [saveDuration, setSaveDuration] = useState("")
    const [saveDurationType, setSaveDurationType] = useState("")

    const [moreOptions, setMoreOptions] = useState(false)

    const saveDurationStyle = {
        marginRight: '15px'
    }

    return(
        <div>
            <form className='mapbox-isochrone-form'>
                <div className="input-group">
                    <label>Drivetime Unique Identifier</label>
                    <input type="text" className="form-control" onChange={(e) => {setDrivetimeUniqueIdentifier(e.target.value)}} placeholder="Allowed characters [09AZaz_-]" value={drivetimeUniqueIdentifier}/> 
                    {/* { drivetimeUniqueIdentifierError(drivetimeUniqueIdentifier) && <span>Only letters, numbers and -_ characters are allowed, no spaces</span>} */}
                </div>
                <br />
                <div className="input-group">
                    <label>Save Drivetime</label>
                    <br />
                    <span style={saveDurationStyle}>
                        <input type="radio" className="save-duration" name="save-duration" value="yes" onChange={(e) => setSaveLayer("yes")} />Yes
                    </span>
                    <span style={saveDurationStyle}>
                        <input type="radio" className="save-duration" name="save-duration" value="no" onChange={(e) => setSaveLayer("no")} />No
                    </span>
                </div>
                {/* <div className="input-group">
                    <label>Save Duration</label>
                    <input type="number" className="form-control" onChange={(e) => {setSaveDuration(e.target.value)}} placeholder="Save this drivetime for how long?" value={saveDuration}/> 
                </div>
                <br />
                <div className="input-group">
                    <span style={saveDurationStyle}>
                        <input type="radio" className="save-duration" name="save-duration" value="minutes" onChange={(e) => setSaveDurationType("minutes")} />Minutes
                    </span>
                    <span style={saveDurationStyle}>
                        <input type="radio" className="save-duration" name="save-duration" value="hours" onChange={(e) => setSaveDurationType("hours")} />Hours
                    </span>
                    <span style={saveDurationStyle}>
                        <input type="radio" className="save-duration" name="save-duration" value="days" onChange={(e) => setSaveDurationType("days")} />Days
                    </span>
                    <span style={saveDurationStyle}>
                        <input type="radio" className="save-duration" name="save-duration" value="months" onChange={(e) => setSaveDurationType("months")} />Months
                    </span>
                </div> */}
                <br />
                <div className="input-group">
                    <label>Latitude</label>
                    <input type="text" className="form-control" onChange={(e) => setLat(e.target.value)} placeholder="Latitude" value={props.inputs.latlng.lat} disabled/> 
                </div>
                <br />
                <div className="input-group">
                    <label>Longitude</label>
                    <input type="text" className="form-control" onChange={(e) => setLng(e.target.value)} placeholder="Longitude" value={props.inputs.latlng.lng} disabled/> 
                </div>
                <br />
                <div className="input-group">
                    <label>Drivetime Minutes</label>
                    <div className='minutes-selection'></div>
                    <input type="number" className="form-control" onChange={(e) => {setMinutes(e.target.value)}} placeholder="Drivetime Minutes" value={minutes} /> 
                </div>
                <br />
                <div className="input-group">
                    <label>Distance</label>
                    <input type="number" className="form-control" onChange={(e) => {setDistance(e.target.value)}} placeholder="Distance in metres" value={distance}/> 
                </div>
                <a href='Javascript:void(0)' 
                onClick={() => {
                    setMoreOptions(!moreOptions)
                }}
                style={{
                    padding: '10px'
                }}>
                    <span>
                        {`${moreOptions ? 'hide more options' : 'see more options'}`}
                    </span>
                </a>
                <div className='more-options' style={{
                    display: moreOptions ? 'block' : 'none',
                    padding: '10px'
                }}>
                    <div className='input-group'>
                        <label style={{
                            marginRight: '10px'
                        }}>Polygons?</label>
                        <input type='checkbox' defaultChecked={polygons} onChange={() => setPolygons(!polygons)} />
                    </div>

                </div>

            </form>
            <center>
            <button  onClick={() => {

                // if(drivetimeUniqueIdentifierError(drivetimeUniqueIdentifier)) return

                const form = {
                    lat: props.inputs.latlng.lat,
                    lng: props.inputs.latlng.lng,
                    minutes,
                    distance,
                    polygons,
                    save: saveLayer,
                    drivetime_identifier: drivetimeUniqueIdentifier
                }

                console.log(form)

                props.inputs.onsubmit(form)

                }} className='btn btn-primary req-btn'>{props.inputs.buttonText}</button>
            </center>
        </div>
    )
}

export default MapboxIsochroneInputForm