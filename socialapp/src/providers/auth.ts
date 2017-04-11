import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {FirebaseAuthConfig,FirebaseApp,FirebaseAuthState,FirebaseRef,AngularFire} from 'angularfire2';
import {LocalStorage,Storage} from 'ionic';
import firebase from 'firebase';
/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  local=new Storage(LocalStorage);
  public af;

  constructor(public http: Http, af:AngularFire) {
    console.log('Hello Auth Provider');
    this.af = af;
    // this.fbAuth = fbAuth;
  }

  getAuth(){
    return this.af.auth;
  }

//sign in = log in
  login(credentials){
    return this.af.login(credentials);
  }
//create account
  createAccount(credentials){
    return this.af.auth.createUser(credentials);
  }

  logout(){
    firebase.auth().signOut();
  }

}
