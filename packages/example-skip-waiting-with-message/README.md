## Example: Activate the service worker and refresh the page on user acceptance

### Why?

In this case, a notification will be displayed to user when update is available, and on user confirmation, it will be activated and
the page will be refreshed.
The gap between activating new service worker and refreshing the window is **minimized**

If [w3c/ServiceWorker#1016](https://github.com/w3c/ServiceWorker/issues/1016) becomes a thing,
then messaging between the window and service worker contexts is not required.

### Note:
It is not clear how `workbox-webpack-plugin` can generate communication between the window and service worker contexts.

### how it works

Running sample:
- `npm start` or `yarn start` to run the sample
- browse http://localhost:9904
- It will generate a new service worker every minute
- client will check for new update every 30 seconds
- When new version is available, it shows a message to the user
- When user accept the message, the new version will be applied by sending a message to service worker to skip waiting
- and it will refresh the page when the new version is activated

Please refer to `react-workbox` documentation:
https://github.com/NShahri/react-workbox