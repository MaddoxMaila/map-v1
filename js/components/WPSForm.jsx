import React, {useState} from 'react'

const WPSForm = (props) => {

    const [lat, setLat] = useState(props.form.latlng.lat)
    const [lng, setLng] = useState(props.form.latlng.lng)
    const [distance, setDistance] = useState(0)
    const [segments, setSegments] = useState(0)

    return (
    <div className="form-modal" style={{
        display: props.isModeOn && props.showForm ? 'block' : 'none'
    }}>
        <div className="form-wrapper forms-pop" style={{
            display: props.isModeOn && props.showForm ? 'block' : 'none'
        }}>

            <div className="media">
                <div className="media-body">
                    <span style={{
                        fontWeight: "bolder",
                        fontSize: "24pt",
                    }}>WPS Request</span>
                </div>
                <div className="media-right" style={{
                    paddingTop: "2.5%"
                }}>
                    <a className="btn btn-primary square-btn form-close-btn" onClick={() => {
                        props.onClose()
                    }}>
                    <i className="fa fa-times"></i>
                    </a>
                </div>
            </div>
            <br />
            <form className="">
                <div className="input-group">
                    <label>Latitude</label>
                    <input type="text" className="form-control" onChange={(e) => {setLat(e.target.value)}} placeholder="Latitude" value={props.form.latlng.lat}/> 
                </div>
                <br />
                <div className="input-group">
                    <label>Longitude</label>
                    <input type="text" className="form-control" onChange={(e) => {setLng(e.target.value)}} placeholder="Longitude" value={props.form.latlng.lng}/> 
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

                props.onSubmit({
                    lat,
                    lng,
                    distance,
                    segments
                })

                }} className='btn btn-primary req-btn'>Submit WPS Request</button>
            </center>
        </div>
    </div>
  )
}

export default WPSForm