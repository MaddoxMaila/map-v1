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
import {loadMapConfig, loadNewMap} from '@mapstore/actions/config';
import {CLICK_ON_MAP, initMap} from '@mapstore/actions/map';
import url from 'url'

import './styles/root-style.css';


// import WPSForm from './components/WPSForm'

import eventBus from '@js/lib/eventBus'
import appImage from '@js/lib/resolveImg'
import {BufferWpsRequest, getDrivetimeWPS} from '@js/lib/wps/index'
import BaseForm from '@js/components/BaseForm'
import {BufferInputForm, MapboxIsochroneInputForm} from '@js/components/inputs'

const urlQuery = url.parse(window.location.href, true).query;

class Wurth extends React.Component {

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

    render() {

        eventBus.on("mapclick", data => {
            this.setState({clickEvent : data, showForm: this.state.isWPSModeOn})
        })

        eventBus.remove("mapclick", () => {})

        let currentLocation = this.state.clickEvent?.latlng || {lat: 0, lng: 0}

        const bufferForm = {
            header: 'Create Drivetimes',
            mode: this.state.isWPSModeOn,
            show: this.state.showForm,
            inputs: {
                latlng: currentLocation,
                buttonText: 'Get Drivetime',
                onsubmit: getDrivetimeWPS,
            }
        }

         return (
            <div className="view-wrapper">
                <div className="move-image">
                    <img src={appImage()} className="image-logo" />
                </div>

                <div className="map-view-wrapper">
                    <a className={`wps-mode-wrapper ${this.state.isWPSModeOn ? 'btn-success' : 'btn-primary'}`} onClick={() => {
                            this.toggleWPSMode()
                    }}>
                        <i className="fa fa-map-pin fa-white"></i>
                    </a>

                    <MapViewerCmp {...this.props} />
                </div>

                <BaseForm form={bufferForm} onclose={() => {this.onFormClose()}}>
                    <MapboxIsochroneInputForm inputs={bufferForm.inputs} />
                </BaseForm>
            </div>
         )
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
})(Wurth);