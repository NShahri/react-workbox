// @flow

import React from 'react';

type ContextType = {|
    isUpdateAvailable: boolean,
    isUpdateActivated: boolean,
|};

const WorkBoxContext = React.createContext<ContextType>({isUpdateAvailable: false, isUpdateActivated: false});

export default WorkBoxContext;
