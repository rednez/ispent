// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    apiKey: 'AIzaSyBNQXR0Uww0r5NxbPZH3OkJgZ10XzIbg80',
    authDomain: 'ispent-dev.firebaseapp.com',
    projectId: 'ispent-dev',
    storageBucket: 'ispent-dev.appspot.com',
    messagingSenderId: '26628203603',
    appId: '1:26628203603:web:3966de5c057665d39b52a6',
  },
  apollo: {
    uri: 'http://localhost:3333/graphql',
  },
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
