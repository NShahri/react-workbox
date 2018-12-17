## Example: Activate the service worker and refresh the page on user acceptance

### Why?

In this case, a notification will be displayed to user when update is available.
On user confirmation, the new version will be activated and the page will be refreshed.
The gap between activating new service worker and refreshing the window is **minimized**.

If [w3c/ServiceWorker#1016](https://github.com/w3c/ServiceWorker/issues/1016) becomes a thing,
then messaging between the window and service worker contexts is not required.

### How to implement

Add `WorkBoxProvider` to the `App.js`:
```js
<WorkBoxProvider interval={30 * 1000}>
    [...]
</WorkBoxProvider>
```

Use `UpdateAvailable` or `UpdateActivated` in your app:
```js
    onUpdateClick = async () => {
        const registration = await navigator.serviceWorker.getRegistration();
        registration.waiting.postMessage('skipWaiting');
    };

    <UpdateAvailable>
        <button
            onClick={this.onUpdateClick}>Update
            Available - Click to Install
        </button>
    </UpdateAvailable>
    <UpdateActivatedReload/>
```

you need to change your service worker to be able to communicate and skip waiting when user clicks on update button.
As in create-react-app it is not possible to change workbox configurations,
you can use [customize-cra](https://github.com/arackaf/customize-cra) to change default workbox configurations.

This is the config for customize-cra, to setup communication and skip waiting in this sample:
```js
const {adjustWorkbox, override} = require('customize-cra');

module.exports = {
    webpack: override(
        adjustWorkbox(wb =>
            Object.assign(wb, {
                importScripts: ['serviceWorkerMessageHandler.js']
            })
        )),
};
```

```js
// serviceWorkerMessageHandler.js file
self.addEventListener('message', (event) => {
    if (!event.data){
        return;
    }

    switch (event.data) {
        case 'skipWaiting':
            self.skipWaiting();
            break;
        default:
            // NOOP
            break;
    }
});
```

### Running demo:
- `npm start` or `yarn start` to run the sample
- browse http://localhost:9904
- This sample generates a new service worker every minute for demo purpose
- client will check for new update every 30 seconds
- When new version is available, it shows a message to the user
- When user accepts the message, the new version will be applied by sending a message to service worker to skip waiting
- and it will refresh the page when the new version is activated

### Documentation
Please refer to `react-workbox` documentation:
https://github.com/NShahri/react-workbox