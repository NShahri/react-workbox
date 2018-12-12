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
                registration.installing.onstatechange = e => {
                    switch (e.target.state) {
                        case 'installed':
                            e.target.firstWorker = !Boolean(serviceWorker.controller);
                            checkUpdateAvailable(registration);
                            break;
                        case 'activated':
                            if (!e.target.firstWorker) {
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
