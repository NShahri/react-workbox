## Example3: Using messaging between the window and service worker contexts

### Why?

**If [w3c/ServiceWorker#1016](https://github.com/w3c/ServiceWorker/issues/1016) becomes a thing,
then messaging between the window and service worker contexts is not required.**

### Note:
It is not clear how `workbox-webpack-plugin` can generate communication between the window and service worker contexts.

### how it works

Running sample:
- `npm start` or `yarn start` to run the sample
- It will generate a new service worker every minute
- client will check for new update every 30 seconds
- When new version is available it shows a message to the user
- When user accepted ti apply the update, it will send a message to service worker to skip waiting
- and it will refresh the page when the new version is activated

