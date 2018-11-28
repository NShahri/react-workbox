// @flow

import emptyFunction from 'empty/function';

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
        window.addEventListener('load', () => {
            registerValidSW(serviceWorker, config);
        });
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
    serviceWorker.addEventListener('controllerchange', () => {
        onActivate();
    });

    serviceWorker
        .register(serviceWorkerUrl)
        .then(registration => {
            onRegister(registration);

            registration.onupdatefound = () => {
                if (registration.waiting && registration.active) {
                    onUpdate(registration.waiting);
                }

                const newWorker = ((registration.installing: any): ServiceWorker);

                newWorker.onstatechange = () => {
                    if (newWorker.state === 'installed') {
                        if (serviceWorker.controller) {
                            onUpdate(newWorker);
                        }
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
