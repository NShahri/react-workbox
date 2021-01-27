import React from 'react';
import TestRenderer from 'react-test-renderer';

import WorkboxProvider from './WorkboxProvider';

test('Rendering WorkboxProvider successfully', () => {
    const testRenderer = TestRenderer.create(<WorkboxProvider />);

    expect(() => testRenderer.toJSON()).not.toThrow();
});

test('Rendering WorkboxProvider render exact children', () => {
    const testRenderer = TestRenderer.create(<WorkboxProvider>CHILD</WorkboxProvider>);

    expect(testRenderer.toJSON()).toBe('CHILD');
});

