import { appURL } from "./resolveUrl"

const appImage = () => {

    let appName = "wurth"
    
    return `http://${appURL}/${window.location.port == '8080' ? `${appName}/assets/img/logo_wuerth.svg` : 'assets/img/logo_wuerth.svg'}`

}

export default appImage