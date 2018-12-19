// @flow

import emptyFunction from 'empty/function';

// TODO: use Event type
type ServiceWorkerEvent = {|
    target: EventTarget & {|
        state: 'installed' | 'activated',
        firstWorker: ?boolean,
    |},
|};

type ConfigType = {|
    serviceWorkerUrl: string,
    onUpdate?: ServiceWorker => void,
    onRegister?: ServiceWorkerRegistration => void,
    onActivate?: () => void,
    onError?: Error => void,
|};

export function register(config: ConfigType) {
    const serviceWorker = navigator.serviceWorker;
    if (serviceWorker) {
        registerValidSW(serviceWorker, config);
    }
}

function registerValidSW(
    serviceWorker: ServiceWorkerContainer,
    {
        serviceWorkerUrl,
        onRegister = emptyFunction,
        onUpdate = emptyFunction,
        onActivate = emptyFunction,
        onError = emptyFunction,
    }: ConfigType
) {
    function checkUpdateAvailable(registration) {
        if (registration.waiting && serviceWorker.controller) {
            onUpdate(registration.waiting);
        }
    }

    serviceWorker
        .register(serviceWorkerUrl)
        .then(registration => {
            onRegister(registration);

            checkUpdateAvailable(registration);

            registration.onupdatefound = () => {
                // $FlowFixMe
                registration.installing.onstatechange = ({target}: ServiceWorkerEvent) => {
                    switch (target.state) {
                        case 'installed':
                            target.firstWorker = !Boolean(serviceWorker.controller);
                            checkUpdateAvailable(registration);
                            break;
                        case 'activated':
                            if (!target.firstWorker) {
                                onActivate();
                            }
                            break;
                    }
                };
            };
        })
        .catch(error => {
            onError(error);
        });
}

export function unregister() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
