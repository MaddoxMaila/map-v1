/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {connect} from 'react-redux'
import MapViewerCmp from '@mapstore/product/components/viewer/MapViewerCmp';
import MapViewerContainer from '@mapstore/containers/MapViewer';
import {executeProcess, executeProcessRequest, executeProcessXML} from '@mapstore/observables/wps/execute'
import {loadMapConfig, loadNewMap} from '@mapstore/actions/config';
import {CLICK_ON_MAP, initMap} from '@mapstore/actions/map';
import url from 'url'

import './styles/root-style.css';
import NameLogo from './components/NameLogo';
import { cdata, complexData, literalData, processData, processParameter, rawDataOutput, responseForm } from '@mapstore/observables/wps/common';


import WPSForm from './components/WPSForm'

import eventBus from '@js/eventBus'
import appImage from '@js/lib/resolveImg'
import appURL from '@js/lib/resolveUrl'

const urlQuery = url.parse(window.location.href, true).query;

class MyApp extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            isWPSModeOn: false,
            clickEvent: window?.clickEvent,
            showForm: false
        }

    }

    static defaultProps = {
        mode: 'desktop',
        plugins: {},
        match: {
            params: {}
        },
        wrappedContainer: MapViewerContainer,
    };

    onFormClose(){
        this.setState({
            isModeOn: true,
            showForm: false
        })
    }

    toggleWPSMode(){

        this.setState({
            isWPSModeOn: !this.state.isWPSModeOn
        })

        if(this.props.state.mapInfo.enabled){
            this.props.state.mapInfo.enabled = false
        }

    }

    onSubmit(fullForm){


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

     render() {

        eventBus.on("clickEvent", data => {
            this.setState({clickEvent : data, showForm: this.state.isWPSModeOn})
        })

        eventBus.remove("clickEvent", () => {})

        let currentLocation = this.state.clickEvent?.latlng || {lat: 0, lng: 0}

        const form = {
            latlng: currentLocation
        }

         return (
            <div>
                <div className="move-image">
                    <img src={appImage()} className="image-logo" />
                </div>

                <div className="map-view-wrapper">
                    <MapViewerCmp {...this.props} />
                </div>

                <WPSForm onClose={() => {
                    this.onFormClose()
                }} isModeOn={this.state.isWPSModeOn} showForm={this.state.showForm} form={form} onSubmit={this.onSubmit}/>

                {/* <div className="attribution align-middle">
                    <img src={appImage()} className="logo"/>
                </div> */}

                    <a className={`wps-mode-wrapper ${this.state.isWPSModeOn ? 'btn-success' : 'btn-primary'}`} onClick={() => {
                        this.toggleWPSMode()
                    }}>
                        <i className="fa fa-map-pin fa-white"></i>
                    </a>

            </div>
         );
     }
}
 
export default connect((state) => ({
    mode: 'desktop',
    state
}),
{
    loadNewMap,
    loadMapConfig,
    onInit: initMap,
})(MyApp);