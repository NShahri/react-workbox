import React from 'react';
import TestRenderer from 'react-test-renderer';

import WorkboxProvider from './WorkboxProvider';

test('Rendering WorkboxProvider successfully', () => {
    const testRenderer = TestRenderer.create(<WorkboxProvider />);

    expect(() => testRenderer.toJSON()).not.toThrow();
});

test('Rendering WorkboxProvider render exact children', () => {
    const testContent = 'CHILD';
    const testRenderer = TestRenderer.create(<WorkboxProvider>{testContent}</WorkboxProvider>);

    expect(testRenderer.toJSON()).toBe(testContent);
});
