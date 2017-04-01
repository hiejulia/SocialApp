import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AuthProvider} from '../providers/auth';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
export const firebaseConfig = {
  apiKey: "AIzaSyBDyjjw4ICoN8Y2yvmxDZJgagoZxnk1Tbs",
    authDomain: "socialappwithionic2.firebaseapp.com",
    databaseURL: "https://socialappwithionic2.firebaseio.com",
     projectId: "socialappwithionic2",
    storageBucket: "socialappwithionic2.appspot.com",
    messagingSenderId: "192419977888"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
     AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}


// <script src="https://www.gstatic.com/firebasejs/3.7.4/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyBDyjjw4ICoN8Y2yvmxDZJgagoZxnk1Tbs",
//     authDomain: "socialappwithionic2.firebaseapp.com",
//     databaseURL: "https://socialappwithionic2.firebaseio.com",
//     projectId: "socialappwithionic2",
//     storageBucket: "socialappwithionic2.appspot.com",
//     messagingSenderId: "192419977888"
//   };
//   firebase.initializeApp(config);
// </script>
