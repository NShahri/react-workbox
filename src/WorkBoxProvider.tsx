import React, {FC, useEffect, useState} from 'react';
import {Workbox} from 'workbox-window';

import WorkBoxContext from './WorkBoxContext';

const WorkBoxProvider: FC<{serviceWorkerUrl: string; interval: number}> = ({
    children,
    serviceWorkerUrl = `/service-worker.js`,
    // interval = 60 * 60 * 1000, // 1 hour
}) => {
    // let timer: number | null = null;
    const [isUpdateWaiting, setUpdateWaiting] = useState(false);
    const [workbox, setWorkbox] = useState<Workbox | undefined>(undefined);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | undefined>(undefined);

    useEffect(() => {
        console.log('USE-EFFECT');
        if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
            const wb = new Workbox(serviceWorkerUrl);
            setWorkbox(wb);
            // @ts-ignore
            const showSkipWaitingPrompt = (event) => {
                console.log('showSkipWaitingPrompt', event.wasWaitingBeforeRegister, event);
                setUpdateWaiting(true);
                // `event.wasWaitingBeforeRegister` will be false if this is
            };

            // Add an event listener to detect when the registered
            // service worker has installed but is waiting to activate.
            // @ts-ignore
            wb.addEventListener('waiting', (e) => console.log('WAITING', e) || showSkipWaitingPrompt(e));

            wb.register().then((r) => setRegistration(r));
        }
    }, []);

    return (
        <WorkBoxContext.Provider
            value={{
                isUpdateWaiting,
                activateUpdate: () => {
                    if (!workbox || !registration) {
                        return;
                    }

                    console.log('ACTIVATE UPDATE', registration, workbox);
                    workbox.addEventListener('controlling', (e) => {
                        // would be called when wasWaitingBeforeRegister = true
                        // would be called when isExternal = false
                        console.log('CONTROLLING', e, e.isExternal);
                        if (!e.isExternal) {
                            // <---- may need to be removed
                            // To avoid calling reload twice, needs to check isExternal
                            window.location.reload();
                        }
                    });
                    workbox.addEventListener('activated', (e) => {
                        // would be called when isExternal = true
                        // would be called when isExternal = false
                        console.log('ACTIVATED', e, e.isExternal);
                        if (e.isExternal) {
                            // REF: https://developers.google.com/web/tools/workbox/modules/workbox-window#when_an_unexpected_version_of_the_service_worker_is_found
                            // When it is external worker, it would not trigger "controlling" event
                            // To avoid calling reload twice, needs to check if it is external
                            window.location.reload();
                        }
                    });

                    if (registration.waiting) {
                        console.log('workbox MESSAGESKIPWAITING');
                        workbox.messageSkipWaiting();
                        setUpdateWaiting(false);
                    } else {
                        window.location.reload();
                    }
                },
            }}>
            {children}
        </WorkBoxContext.Provider>
    );
};

export default WorkBoxProvider;
