

const appImage = () => {

    let appName = "wurth"
    
    return `http://${window.location.hostname}:${window.location.port}/${window.location.port == '8080' ? `${appName}/assets/img/logo_wuerth.svg` : 'assets/img/logo_wuerth.svg'}`

}

export default appImage