// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBase: 'https://api.themoviedb.org/3',
  apiKey: '?api_key=1a5602c2cce1df66d9735323fe31b85d',
  firebase : {
    apiKey: "AIzaSyDL9bwG8BghlGZCbLcNaJS1YQ_4OP-LPUY",
    authDomain: "movieapp-92c95.firebaseapp.com",
    projectId: "movieapp-92c95",
    storageBucket: "movieapp-92c95.appspot.com",
    messagingSenderId: "683529852271",
    appId: "1:683529852271:web:1c9933a3b339dce738449a"
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
