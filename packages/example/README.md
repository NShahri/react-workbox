## Example: reopen the browser to activate new version

### Why?

In this sample, only want to notify to the user new version is available, and to activate the new version,
all tabs/pages has to be closed and reopened

NOTE:
**refreshing pages will not activate the new version**

### How to implement

Add `WorkBoxProvider` to the `App.js`:
```js
<WorkBoxProvider interval={30 * 1000}>
    [...]
</WorkBoxProvider>
```

Use `UpdateAvailable` or `UpdateActivated` in your app:
```js
    <UpdateAvailable>
        Update Available - You need to close all tabs on reopen your browser
        to be able to use new version.
    </UpdateAvailable>
    <UpdateActivated>
        Update Activated - You can see this message because dev tools is used
        to activate the new version by using skip waiting
    </UpdateActivated>
```

### Running demo:
- Run `npm start` or `yarn start` to run the sample
- Browse http://localhost:9902
- This sample generates a new service worker every minute for demo purpose
- Client will check for new update every 30 seconds
- When new version is available, a message to tell the user about new version will be displayed
- When all tabs in the browser closed, the new version will be activated

### Documentation
Please refer to `react-workbox` documentation:
https://github.com/NShahri/react-workbox