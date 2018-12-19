// @flow

import React from 'react';

import type {Node} from 'react';

import WorkBoxContext from './WorkBoxContext';

type Props = {|
    children: Node | (boolean => Node),
|};

const UpdateAvailable = ({children}: Props) => (
    <WorkBoxContext.Consumer>
        {({isUpdateAvailable}) => {
            if (typeof children === 'function') {
                return children(isUpdateAvailable);
            }

            return isUpdateAvailable && children;
        }}
    </WorkBoxContext.Consumer>
);

export default UpdateAvailable;
