## Example: reopen the browser to activate new version

### Why?

In this case, all tabs which is using the same service worker, has to be closed and reopened again.

##NOTE:
**refreshing pages will not activated the new version**

### how it works

Running sample:
- Run `npm start` or `yarn start` to run the sample
- Browse http://localhost:9902
- It will generate a new service worker every minute
- Client will check for new update every 30 seconds
- When new version is available, a message to tell the user about new version can be displayed
- When all tabs in the browser closed, the new version will be activated

