/* global expect, test */

import React from 'react';
import renderer from 'react-test-renderer';

import WorkBoxProvider from './WorkBoxProvider';
import {register, unregister} from './serviceWorker';

jest.mock('./serviceWorker');

beforeEach(() => {
    unregister.mockClear();
    register.mockClear();
});

test('Register service worker when provider is enabled', () => {
    renderer.create(<WorkBoxProvider disabled={false} />);

    expect(register.mock.calls.length).toBe(1);
    expect(unregister.mock.calls.length).toBe(0);
});

test('Register service worker when provider is disabled', () => {
    renderer.create(<WorkBoxProvider disabled={true} />);

    expect(register.mock.calls.length).toBe(0);
    expect(unregister.mock.calls.length).toBe(1);
});

test('Register service worker should be disabled on dev machine by default ', () => {
    renderer.create(<WorkBoxProvider />);

    expect(register.mock.calls.length).toBe(0);
    expect(unregister.mock.calls.length).toBe(1);
});

// TODO: fix this
// At this point WorkBoxProvider has been already loaded and default values are set
// changing does not affect anything
//
// test('Register service worker should be enabled on production by default ', () => {
//     process.env.NODE_ENV = 'production';
//     jest.resetModules(); // this is important
//     renderer.create(<WorkBoxProvider />);
//
//     expect(register.mock.calls.length).toBe(1);
//     expect(unregister.mock.calls.length).toBe(0);
// });
