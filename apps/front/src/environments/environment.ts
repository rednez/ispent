// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'ispent-f4f72',
    appId: '1:242366794744:web:dbbe8590f9e8c583dca40d',
    storageBucket: 'ispent-f4f72.appspot.com',
    apiKey: 'AIzaSyActXC7uygpVQgtrJ2yayk9i3PrkZylN7o',
    authDomain: 'ispent-f4f72.firebaseapp.com',
    messagingSenderId: '242366794744',
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
