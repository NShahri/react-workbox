import React, {FC, useEffect, useState} from 'react';
import {Workbox} from 'workbox-window';

import WorkboxContext from './WorkboxContext';
import logger from './logger';
import {WorkboxLifecycleWaitingEvent} from 'workbox-window/utils/WorkboxEvent';

const WorkboxProvider: FC<{serviceWorkerUrl?: string; interval?: number}> = ({
    children,
    serviceWorkerUrl = `/service-worker.js`,
    interval = 60 * 60 * 1000, // 1 hour
}) => {
    const [isUpdateWaiting, setUpdateWaiting] = useState(false);
    const [workbox, setWorkbox] = useState<Workbox | undefined>();
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | undefined>();

    useEffect(() => {
        logger.log('USE-EFFECT');
        if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) {
            return;
        }

        const timer = Boolean(interval) && setInterval(() => wb.update(), interval);

        const wb = new Workbox(serviceWorkerUrl);
        setWorkbox(wb);
        const showSkipWaitingPrompt = (event: WorkboxLifecycleWaitingEvent) => {
            logger.log('showSkipWaitingPrompt', event.wasWaitingBeforeRegister, event);
            setUpdateWaiting(true);
            // `event.wasWaitingBeforeRegister` will be false if this is
        };

        // Add an event listener to detect when the registered
        // service worker has installed but is waiting to activate.
        wb.addEventListener('waiting', (e) => {
            logger.log('WAITING', e);
            showSkipWaitingPrompt(e);
        });

        wb.register().then((r) => setRegistration(r));

        return () => {
            if (timer) clearInterval(timer);
        };
    }, []);

    return (
        <WorkboxContext.Provider
            value={{
                isUpdateWaiting,
                activateUpdate: () => {
                    if (!workbox || !registration) {
                        return;
                    }

                    logger.log('ACTIVATE UPDATE', registration, workbox);
                    workbox.addEventListener('controlling', (e) => {
                        // would be called when wasWaitingBeforeRegister = true
                        // would be called when isExternal = false
                        logger.log('CONTROLLING', e, e.isExternal);
                        if (!e.isExternal) {
                            // <---- may need to be removed
                            // To avoid calling reload twice, needs to check isExternal
                            window.location.reload();
                        }
                    });
                    workbox.addEventListener('activated', (e) => {
                        // would be called when isExternal = true
                        // would be called when isExternal = false
                        logger.log('ACTIVATED', e, e.isExternal);
                        if (e.isExternal) {
                            // REF: https://developers.google.com/web/tools/workbox/modules/workbox-window#when_an_unexpected_version_of_the_service_worker_is_found
                            // When it is external worker, it would not trigger "controlling" event
                            // To avoid calling reload twice, needs to check if it is external
                            window.location.reload();
                        }
                    });

                    if (registration.waiting) {
                        logger.log('workbox MESSAGESKIPWAITING');
                        workbox.messageSkipWaiting();
                        setUpdateWaiting(false);
                    } else {
                        window.location.reload();
                    }
                },
            }}>
            {children}
        </WorkboxContext.Provider>
    );
};

export default WorkboxProvider;
