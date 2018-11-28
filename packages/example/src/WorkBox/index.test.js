/* global expect, test */

import module from './index';

test('module', () => {
    expect(module({})).toBe('Hello world!!');
});
