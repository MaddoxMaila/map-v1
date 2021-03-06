/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import AeronauticalCoordinateEditor from '../AeronauticalCoordinateEditor';

describe('AeronauticalCoordinateEditor enhancer', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('AeronauticalCoordinateEditor rendering with defaults', () => {
        ReactDOM.render(<AeronauticalCoordinateEditor />, document.getElementById("container"));
        const container = document.getElementById('container');
        const elements = container.querySelectorAll('input');
        expect(elements.length).toBe(3);
    });
    it('AeronauticalCoordinateEditor rendering from annotation viewer with defaults', () => {
        ReactDOM.render(<AeronauticalCoordinateEditor/>, document.getElementById("container"));
        const container = document.getElementById('container');
        const elements = container.querySelectorAll('input');
        expect(elements.length).toBe(3);
        expect(elements[0].disabled).toBe(false);
        expect(elements[1].disabled).toBe(false);
        expect(elements[2].disabled).toBe(false);
    });
    it('AeronauticalCoordinateEditor rendering with 13.3333333333', () => {
        ReactDOM.render(<AeronauticalCoordinateEditor value={13.3333333333} />, document.getElementById("container"));
        const container = document.getElementById('container');
        const elements = container.querySelectorAll('input');
        expect(elements.length).toBe(3);
        expect(elements[0].value).toBe('13');
        expect(elements[1].value).toBe('20');
        expect(elements[2].value).toBe('0');
    });
    it('Test AeronauticalCoordinateEditor onChange', () => {
        const actions = {
            onChange: () => {}
        };
        const spyonChange = expect.spyOn(actions, 'onChange');
        ReactDOM.render(<AeronauticalCoordinateEditor value={19} onChange={actions.onChange} />, document.getElementById("container"));
        const container = document.getElementById('container');

        const elements = container.querySelectorAll('input');
        expect(elements.length).toBe(3);
        expect(elements[0].value).toBe('19');
        expect(elements[1].value).toBe('0');
        expect(elements[2].value).toBe('0');
        ReactTestUtils.Simulate.change(elements[0], { target: { value: "20" } });
        expect(spyonChange).toHaveBeenCalled();
        expect(parseFloat(spyonChange.calls[0].arguments[0])).toBe(20);
    });
    it('Test AeronauticalCoordinateEditor onChange not exceed maxDegrees', () => {
        const actions = {
            onChange: () => { }
        };
        const spyonChange = expect.spyOn(actions, 'onChange');
        ReactDOM.render(<AeronauticalCoordinateEditor
            coordinate="lon"
            value={180}
            onChange={actions.onChange} />, document.getElementById("container"));
        const container = document.getElementById('container');
        const elements = container.querySelectorAll('input');
        expect(elements.length).toBe(3);
        expect(elements[0].value).toBe('180');
        expect(elements[1].value).toBe('0');
        expect(elements[2].value).toBe('0');
        ReactTestUtils.Simulate.change(elements[1], { target: { value: "20" } });
        ReactTestUtils.Simulate.blur(elements[1]);
        expect(spyonChange).toHaveBeenCalled();
        expect(parseFloat(spyonChange.calls[0].arguments[0])).toBe(180);
    });
    it('Test AeronauticalCoordinateEditor onKeyDown with enter ', () => {
        ReactDOM.render( <AeronauticalCoordinateEditor coordinate="lon" value={10} />, document.getElementById("container"));
        const container = document.getElementById('container');
        const elements = container.querySelectorAll('input');
        expect(elements.length).toBe(3);
        expect(elements[0].value).toBe('10');
        expect(elements[1].value).toBe('0');
        expect(elements[2].value).toBe('0');

        ReactTestUtils.Simulate.keyDown(elements[0], {
            keyCode: 13,
            preventDefault: () => {
                expect(true).toBe(true);
            },
            stopPropagation: () => {
                expect(true).toBe(true);
            }
        });
    });
    it('Test AeronauticalCoordinateEditor LAT fields onChange not exceed max field values', () => {
        const actions = {
            onChange: () => { }
        };
        const spyOnChange = expect.spyOn(actions, 'onChange');
        ReactDOM.render(<AeronauticalCoordinateEditor
            coordinate="lat"
            value={20}
            onChange={actions.onChange}/>, document.getElementById("container"));
        const container = document.getElementById('container');
        let elements = container.querySelectorAll('input');
        const degrees = elements[0];
        const minutes = elements[1];
        const seconds = elements[2];

        expect(elements.length).toBe(3);
        expect(degrees.value).toBe('20');
        expect(minutes.value).toBe('0');
        expect(seconds.value).toBe('0');

        const testValue = 61;
        // Simulate input
        ReactTestUtils.Simulate.change(elements[0], { target: { value: "95" } });
        ReactTestUtils.Simulate.blur(elements[0]);
        ReactTestUtils.Simulate.change(elements[1], { target: { value: testValue } });
        ReactTestUtils.Simulate.blur(elements[1]);
        ReactTestUtils.Simulate.change(elements[2], { target: { value: testValue } });
        ReactTestUtils.Simulate.blur(elements[2]);

        // Result
        expect(+degrees.value).toBeLessThan(95);
        expect(+minutes.value).toBeLessThan(testValue);
        expect(+seconds.value).toBeLessThan(testValue);
        expect(spyOnChange).toHaveBeenCalled();
        expect(parseFloat(spyOnChange.calls[0].arguments[0])).toBe(20);
    });
    it('Test AeronauticalCoordinateEditor LON fields onChange not exceed max field values', () => {
        const actions = {
            onChange: () => { }
        };
        const spyOnChange = expect.spyOn(actions, 'onChange');
        ReactDOM.render(<AeronauticalCoordinateEditor
            coordinate="lon"
            value={160} onChange={actions.onChange} />, document.getElementById("container"));
        const container = document.getElementById('container');
        let elements = container.querySelectorAll('input');
        const degrees = elements[0];
        const minutes = elements[1];
        const seconds = elements[2];

        expect(elements.length).toBe(3);
        expect(degrees.value).toBe('160');
        expect(minutes.value).toBe('0');
        expect(seconds.value).toBe('0');

        const testValue = 61;
        // Simulate input
        ReactTestUtils.Simulate.change(elements[0], { target: { value: "195" } });
        ReactTestUtils.Simulate.blur(elements[0]);
        ReactTestUtils.Simulate.change(elements[1], { target: { value: testValue } });
        ReactTestUtils.Simulate.blur(elements[1]);
        ReactTestUtils.Simulate.change(elements[2], { target: { value: 59.99999 } });
        ReactTestUtils.Simulate.blur(elements[2]);

        // Result
        expect(+degrees.value).toBeLessThan(195);
        expect(+minutes.value).toBeLessThan(testValue);
        expect(+seconds.value).toBeLessThan(testValue);
        expect(+seconds.value).toNotEqual(0);
        expect(spyOnChange).toHaveBeenCalled();
        expect(parseFloat(spyOnChange.calls[0].arguments[0])).toBe(160);
    });
    it('Works with empty aeronauticalOptions', () => {
        ReactDOM.render(<AeronauticalCoordinateEditor
            aeronauticalOptions={{}}
            coordinate="lon"
            value={80}  />, document.getElementById("container"));
        const container = document.getElementById('container');
        let elements = container.querySelectorAll('input');

        expect(elements.length).toBe(3);
    });
});
