import {executeProcess, executeProcessRequest, executeProcessXML} from '@mapstore/observables/wps/execute'
import { cdata, complexData, literalData, processData, processParameter, rawDataOutput, responseForm } from '@mapstore/observables/wps/common';
import appURL from '@js/lib/resolveUrl';

const makeInput = (value, metadata) => {

    let dataItem = metadata.type == 'complex' ? complexData(cdata(value), metadata?.mimeType) : literalData(value)
    let pData = processData(dataItem)
    let processedInput = processParameter(metadata.itemId, pData)

    return processedInput

}

const buildRequestBody = (processType, metadata, inputs) => {

    let outputForm = rawDataOutput(metadata.resultsId, metadata.mimeType)
    let resp = responseForm(outputForm)

    return executeProcessXML(processType, inputs, resp)
}

const BufferWpsRequest = (fullForm) => {

    let inputs = [
        makeInput(`POINT(${fullForm.lat} ${fullForm.lng})`, {
            type: 'complex',
            itemId: 'geom',
            mimeType: 'text/xml; subtype=gml/3.1.1'
        }),
        makeInput(fullForm.distance, {
            type: 'literal',
            itemId: 'distance'
        }),
        makeInput(fullForm.segments, {
            type: 'literal',
            itemId: 'quadrantSegments'
        })
    ]

    let buildRequestPayload = buildRequestBody('geo:buffer', {
        resultsId: 'result',
        mimeType: 'application/json',
    }, inputs)

    executeProcessRequest(`${appURL}/geoserver/wps`,  buildRequestPayload, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/xml'
        }
    }).subscribe(data => {
        alert(JSON.stringify(data))
    })

}

export {
    makeInput,
    buildRequestBody,
    BufferWpsRequest,
}