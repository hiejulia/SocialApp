import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheet } from 'ionic-angular';
import {FirebaseAuthConfig,FirebaseAuthState} from 'angularfire2';
import {UtilProvider} from '../../providers/utils';
import {UserProvider} from '../../providers/user-provider/user-provider';
import {SocialProvider} from '../../providers/social-provider/social-provider';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  user= {};
  profile:Object = {};


  constructor(public navCtrl: NavController, public navParams: NavParams,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }


  //updateProfile


  //log out
  logout(){
    this.afAuth.logout();
  }

  //update picture
  updatePicture(){
    this.present
  }

  updateProfile(){
    let toast = 
  }




}
