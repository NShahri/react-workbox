import React, {FC} from 'react';

import WorkboxContext from './WorkboxContext';

const UpdateWaiting: FC = ({children}) => (
    <WorkboxContext.Consumer>
        {({isUpdateWaiting, activateUpdate}) => {
            if (typeof children === 'function') {
                return children(isUpdateWaiting, activateUpdate);
            }

            return isUpdateWaiting && children;
        }}
    </WorkboxContext.Consumer>
);

export default UpdateWaiting;
