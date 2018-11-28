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
    serviceWorker.addEventListener('controllerchange', (...props) => {
        console.log('CONTROLLER CHANGE', props, serviceWorker);
        onActivate();
    });

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

            let newWorker = null;
            registration.onupdatefound = () => {
                if (newWorker) {
                    newWorker.onstatechange = null;
                }

                newWorker = ((registration.installing: any): ServiceWorker);

                newWorker.onstatechange = () => {
                    if (newWorker.state === 'installed') {
                        newWorker.onstatechange = null;

                        checkUpdateAvailable(registration);
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
