import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {FIREBASE_PROVIDERS,AuthProviders,AuthMethods}from 'angularfire2';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {AuthProvider} from '../providers/auth';
import {SocialProvider} from '../providers/social';
import {UserProvider} from '../providers/user';
import {UtilProvider} from '../providers/util';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,authProvider:AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      let auth =authProvider.getAuth();
      auth.subscribe((result) => {
        if(result) {
          this.rootPage =TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      });

    });
  }





}
