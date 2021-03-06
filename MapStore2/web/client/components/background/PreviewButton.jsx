/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import PropTypes from 'prop-types';
import Toolbar from '../misc/toolbar/Toolbar';
import './css/previewbutton.css';
import OverlayTrigger from "../misc/OverlayTrigger";
import {Tooltip} from "react-bootstrap";
import Message from "../I18N/Message";

class PreviewButton extends React.Component {
    static propTypes = {
        src: PropTypes.string,
        side: PropTypes.number,
        frame: PropTypes.number,
        margin: PropTypes.number,
        labelHeight: PropTypes.number,
        label: PropTypes.string,
        showLabel: PropTypes.bool,
        onToggle: PropTypes.func,
        onAdd: PropTypes.func,
        showAdd: PropTypes.bool,
        tooltipId: PropTypes.string
    };

    static defaultProps = {
        src: './images/mapthumbs/none.jpg',
        side: 50,
        frame: 4,
        margin: 5,
        labelHeight: 29,
        label: '',
        showLabel: true,
        tooltipId: "backgroundSwitcher.tooltip",
        onToggle: () => {},
        onAdd: () => {}
    };

    render() {
        const tooltip = <Tooltip id="background-selector-tooltip"><Message msgId={this.props.tooltipId} /></Tooltip>;
        const TooltipWrapper = this.props.labelHeight > 0 ? React.Fragment : OverlayTrigger;
        return (
            <div className="background-preview-button" style={{margin: this.props.margin}}>
                <TooltipWrapper placement="top" key={"overlay-trigger.changeBackground"} overlay={this.props.labelHeight === 0 && tooltip} >
                    <div className="background-preview-button-container bg-body" onClick={this.props.onToggle} style={{padding: this.props.frame / 2, width: this.props.side + this.props.frame, height: this.props.side + this.props.frame}}>
                        {this.props.showLabel ? (<div className="background-preview-button-label" style={{width: this.props.side, height: this.props.labelHeight, marginTop: 0, padding: 0}} ><div className="bg-body bg-text" style={{padding: this.props.frame }}>{this.props.label}</div></div>) : null}
                        <div className="background-preview-button-frame" style={{width: this.props.side, height: this.props.side}}>
                            <img src={this.props.src}/>
                        </div>
                    </div>
                </TooltipWrapper>
                {this.props.labelHeight > 0 ? <Toolbar
                    btnDefaultProps={{
                        className: 'square-button-md',
                        bsStyle: 'primary'
                    }}
                    buttons={ this.props.showAdd ? [
                        {
                            glyph: 'plus',
                            tooltipId: "backgroundSelector.addTooltip",
                            onClick: () => this.props.onAdd()
                        }
                    ] : []}/> : null}
            </div>
        );
    }
}

export default PreviewButton;
