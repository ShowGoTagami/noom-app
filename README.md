## About this application
This "noom-app" is Web based application, with CRUD actions. As Backend, using Firestore of Firebase. Client side framework is React.js and components are based on Material UI.

## How to use

On local machine.
```
$ npm start
  => access to localhost:3000
```

Test only firestore security rules.
```
$ firebase emulators:start --only firestore
```
and another tab...

```
$ npm run test-watch firestore.rules.test.js
```

you can test result editing test code.


