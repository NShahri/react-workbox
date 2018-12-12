# react-workbox
Managing status of service worker in the page

## Installation

`Yarn`:
```
yarn add react-workbox
```
`NPM`:
```
npm install react-workbox
```

## Use in create-react-app project
- remove `serviceWorker.unregister()` or `serviceWorker.register()` from `src/index.js`
- delete `src/serverWorker.js`
- Add `WorkBoxProvider` to `render` method in `src/App.js`

```js
import {WorkBoxProvider} from "react-workbox";

render() {
    return (
        <WorkBoxProvider interval={30 * 1000}>
        [...your app content in here]
        </WorkBoxProvider>
    );
}
```

- Use `UpdateAvailable` or `UpdateActivated` in the app

```js
<UpdateAvailable>
    Update Available - Activate the new version first, and refresh the page afterwards
</UpdateAvailable>
<UpdateActivated>
    Update Activated - Refresh the page
</UpdateActivated>
```

## Samples

All sample projects are changes to generate new version every minute.

All sample projects check for update in 30 seconds interval.

### Sample 1:
In this sample, only want to notify to the user new version is available, and to activate the new version,
all tabs/pages has to be closed and reopened

This scenario is implemented in https://github.com/NShahri/react-workbox/tree/master/packages/example

### Sample 2:
New service worker will activated asap and will start caching all network requests.
The window will be refreshed on user acceptance.

This scenario is implemented in https://github.com/NShahri/react-workbox/tree/master/packages/example-skip-waiting

### Sample 3:
In this case, a notification will be displayed to user when update is available, and on user confirmation, it will be activated and
the page will be refreshed.
The gap between activating new service worker and refreshing the window is **minimized**.

This scenario is implemented in https://github.com/NShahri/react-workbox/tree/master/packages/example-skip-waiting-with-message

## TODO
- UpdateError
- LastUpdateCheck
- CheckForUpdate
- Tests
- unregister
- logger

## License
MIT
