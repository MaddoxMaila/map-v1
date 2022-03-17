import React from 'react'
import {connect} from 'react-redux'
import LeafletMap from '@mapstore/components/map/leaflet/Map'

import {loadMapConfig, loadNewMap} from '@mapstore/actions/config';
import {CLICK_ON_MAP, initMap} from '@mapstore/actions/map';

class MapStoreHome extends React.Component{

    constructor(props){
        super(props)
        this.props = props
    }
    

    render(){

        console.log('Hello World')

        return (
            <div>
                <LeafletMap {...this.props} />
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
})(LeafletMap);