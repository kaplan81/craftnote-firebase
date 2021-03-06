// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: '***REPLACE WITH THE API KEY***',
    authDomain: 'craftnote-web-challenge.firebaseapp.com',
    databaseURL: 'https://craftnote-web-challenge.firebaseio.com',
    projectId: 'craftnote-web-challenge',
    storageBucket: 'craftnote-web-challenge.appspot.com',
    messagingSenderId: '926271509569',
    appId: '1:926271509569:web:bf11e89892f3bb73fc62c0'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
