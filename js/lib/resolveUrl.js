
const hostname = window.location.hostname
const port = window.location.port
const domain = `http://${hostname}:${port}`
const appURL = domain

const mapboxapiURL = (latlng, params) =>  `https://api.mapbox.com/isochrone/v1/mapbox/driving/${latlng}/?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}&${params}`

const drivetimeWpsURL = (params) => `http://127.0.0.1:80/cgi-bin/zoo_loader.cgi?ServiceProvider=&metapath=&Service=WPS&Request=Execute&Version=1.0.0&Identifier=wurth&DataInputs=params=${params}`

export {
    appURL,
    mapboxapiURL,
    drivetimeWpsURL
}