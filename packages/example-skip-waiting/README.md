## Example: activate service worker asap, and refresh the page on user acceptance

### Why?

New service worker will activated asap and will start caching all network requests.
The window will be refreshed on user acceptance.

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
        Update Available - This message should be visible only for small time,
        as the new version should be activated asap.
        It is recommended to remove UpdateAvailable if you do not need it.
    </UpdateAvailable>
    <UpdateActivated>
        <button
            onClick={() => window.location.reload()}>Update Activated - Click to Refresh
        </button>
    </UpdateActivated>
```

you need to change your service worker to skip waiting as soon as it is installed.

```js
workbox.skipWaiting();
```

As in create-react-app it is not possible to change workbox configurations,
you can use [customize-cra](https://github.com/arackaf/customize-cra) to change default workbox configurations.

- Pull request to override workbox configuration https://github.com/facebook/create-react-app/pull/5369
- customize-cra config https://github.com/NShahri/react-workbox/blob/master/packages/example-skip-waiting/config-overrides.js

### Running demo:
- Run `npm start` or `yarn start` to run the sample
- Browse http://localhost:9903
- It will generate a new service worker every minute
- Client will check for new update every 30 seconds
- When new version is available it will be activated asap
- A confirmation message will be display to the user
- When the message accepted by user, page/window will be refreshed


### Documentation
Please refer to `react-workbox` documentation:
https://github.com/NShahri/react-workbox