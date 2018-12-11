## Example: activate service worker asap, and refresh the page on user acceptance

### Why?

In this case, new service worker will activated asap and will starts caching all network requests.
The window will be refreshed on user acceptance.

### how it works

Running sample:
- Run `npm start` or `yarn start` to run the sample
- Browse http://localhost:9903
- It will generate a new service worker every minute
- Client will check for new update every 30 seconds
- When new version is available it will be activated asap
- A confirmation message will be display to the user
- When the message accepted by user, page/window will be refreshed

Please refer to `react-workbox` documentation:
https://github.com/NShahri/react-workbox