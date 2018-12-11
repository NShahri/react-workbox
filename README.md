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
- remove `serviceWorker.unregister()` from `src/index.js`
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
```
- delete `src/serverWorker.js`
- Add `WorkBoxProvider` to `render` method in `src/App.js`
```js
import {UpdateAvailable, UpdateActivatedReload, UpdateActivated, WorkBoxProvider} from "react-workbox";

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
In this same, only want to notify to the user new version is available, and to activate the new version, all tabs/pages has to be closed and reopened

This scenario is implemented in https://github.com/NShahri/react-workbox/tree/master/packages/example

```js
<WorkBoxProvider interval={30 * 1000}>
    <UpdateAvailable>
        Update Available - You need to close all tabs on reopen your browser
        to be able to use new version.
    </UpdateAvailable>
    <UpdateActivated>
        Update Activated - You can see this message because dev tools is used
        to activate the new version by using skip waiting
    </UpdateActivated>
</WorkBoxProvider>
```

### Sample 2:
New service worker will activated asap and will start caching all network requests.
The window will be refreshed on user acceptance.

This scenario is implemented in https://github.com/NShahri/react-workbox/tree/master/packages/example-skip-waiting

```js
 <WorkBoxProvider interval={30 * 1000}>
    <UpdateAvailable>
        Update Available - This message should not be visible,
        as the new version should be activated asap.
    </UpdateAvailable>
    <UpdateActivated>
        <button
            onClick={() => window.location.reload()}>Update Activated - Click to Refresh
        </button>
    </UpdateActivated>
</WorkBoxProvider>
```

you need to change your service worker to skip waiting as soon as it is installed.

```js
workbox.skipWaiting();
```

As in create-react-app it is not possible to change workbox configurations,
you can use [customize-cra](https://github.com/arackaf/customize-cra) to change default workbox configurations.

- Pull request to override workbox configuration https://github.com/facebook/create-react-app/pull/5369
- customize-cra config https://github.com/NShahri/react-workbox/blob/master/packages/example-skip-waiting/config-overrides.js


### Sample 3:
In this case, a notification will be displayed to user when update is available, and on user confirmation, it will be activated and
the page will be refreshed.
The gap between activating new service worker and refreshing the window is **minimized**.

This scenario is implemented in https://github.com/NShahri/react-workbox/tree/master/packages/example-skip-waiting-with-message

```js
onUpdateClick = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    registration.waiting.postMessage('skipWaiting');
};

<WorkBoxProvider interval={30 * 1000}>
    <UpdateAvailable>
        <button
            onClick={this.onUpdateClick}>Update
            Available - Click to Install
        </button>
    </UpdateAvailable>
    <UpdateActivatedReload/>
</WorkBoxProvider>
```

This sample needs to communicate to service worker. At the moment you need to change your service worker file manually
```js
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


## TODO
- UpdateError
- LastUpdateCheck
- CheckForUpdate
- Tests

## License
MIT
