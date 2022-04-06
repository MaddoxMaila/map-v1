import {drivetimeWpsURL} from '@js/lib/resolveUrl'
// import {executeProcessRequest} from '@mapstore/observables/wps/execute'


const getDrivetimeWPS = (params) => {
  
    fetch(drivetimeWpsURL(JSON.stringify(params)), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/xml'
        }
    }).then(data => {
        console.log(data)
    })

}

export {
    getDrivetimeWPS
}