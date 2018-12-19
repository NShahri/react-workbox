import * as React from 'react';

export interface OnlyChildrenPropsT {
    children: React.ReactNode
}

export const UpdateActivated: React.ComponentType<OnlyChildrenPropsT>;

export const UpdateActivatedReload: React.ComponentType;

export const UpdateAvailable: React.ComponentType<OnlyChildrenPropsT>;

export interface WorkBoxProviderPropsT {
    children: React.ReactNode,
    disabled?: boolean,
    serviceWorkerUrl?: string,
    interval?: number,
    onError?: (Error) => void,
}

export const WorkBoxProvider: React.ComponentType<WorkBoxProviderPropsT>;
