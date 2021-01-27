import {Context, createContext} from 'react';

interface ContextType {
    isUpdateWaiting: boolean;
    activateUpdate?: () => void;
}

const WorkBoxContext: Context<ContextType> = createContext<ContextType>({isUpdateWaiting: false});

export default WorkBoxContext;
