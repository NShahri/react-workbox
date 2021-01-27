import React, {FC} from 'react';

import WorkBoxContext from './WorkBoxContext';

const UpdateWaiting: FC = ({children}) => (
    <WorkBoxContext.Consumer>
        {({isUpdateWaiting, activateUpdate}) => {
            if (typeof children === 'function') {
                return children(isUpdateWaiting, activateUpdate);
            }

            return isUpdateWaiting && children;
        }}
    </WorkBoxContext.Consumer>
);

export default UpdateWaiting;
