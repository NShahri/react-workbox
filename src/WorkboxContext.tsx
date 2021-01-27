import {Context, createContext} from 'react';

interface ContextType {
    isUpdateWaiting: boolean;
    activateUpdate?: () => void;
}

const WorkboxContext: Context<ContextType> = createContext<ContextType>({isUpdateWaiting: false});

export default WorkboxContext;
