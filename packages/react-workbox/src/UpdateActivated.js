// @flow

import React from 'react';

import type {Node} from 'react';

import WorkBoxContext from './WorkBoxContext';

type Props = {|
    children: Node | (boolean => Node),
|};

const UpdateActivated = ({children}: Props) => (
    <WorkBoxContext.Consumer>
        {({isUpdateActivated}) => {
            if (typeof children === 'function') {
                return children(isUpdateActivated);
            }

            return isUpdateActivated && children;
        }}
    </WorkBoxContext.Consumer>
);

export default UpdateActivated;
