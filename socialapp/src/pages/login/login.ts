import { Component ,Inject} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage, LocalStorage} from 'angular';
import{TabsPage } from '../tabs/tabs';
import {FormBuilder,Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth';
import {UserProvider} from '../../providers/user';
import {UtilProvider} from '../../providers/util';
import {firebaseAuthConfig,FirebaseAuthState} from 'angularfire2';
import {CreateAccountPage} from '../../pages/create-account/create-account';
import {validateEmail} from '../../validators/email';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm;
  authProvider;
  storage = new Storage(LocalStorage);

  constructor(public navCtrl: NavController, public navParams: NavParams,form:FormBuilder,authProvider:AuthProvider,
  @Inject(FirebaseAuth) public fbAuth:FirebaseAuthState) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
