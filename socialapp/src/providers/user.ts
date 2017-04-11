import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import {LocalStorage,Storage} from 'angular';
import {AngularFire} from 'angularfire2';
/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  storage= new Storage(new LocalStorage);


  constructor(public http: Http,public af:AngularFire) {
    console.log('Hello User Provider');
  }
  //check if the username is valid
  isUsernameValid(username){
    let promise = new Promise((resolve, reject) => {
      this.searchUser(username)
        .subscribe(value => {
          if(value.length === 0){
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
    return promise;
  }

  //save logged in user info in LocalStorage at user info key
  saveUser(userData){
    this.storage.setJson("userInfo",userData);
  }

  //getUID
  getUid(){
    let promise = new Promise((resolve, reject) => {
      this.storage.get("userInfo")
        .then(value => {
          let uid =JSON.parse(value).auth.uid;
          resolve(uid);
        });
    });
    return promise;
  }
//search user with given user name
  searchUser(username){
    let query={
      orderByChild:'username'
    };
    //user name is given
    if(username){
      query['equalTo'] =username;
    }
    let users =this.af.database.list('/users',{
      query:query
    });
    return users;
  }

  //get all followers when user logged in successful
  getFollowers(){
    return this.getUid()
      .then(uid => {
        return  this.af.database.list(`/users/${uid}/followers`);
      });
  }
//create  user
  createUser(userData){
    return this.getUid()
      .then(uid => {
        let url = `/users/${uid}`;
        let user =this.af.database.object(url);
        return  user.set(userData);
      });
  }
//update profile
  updateProfile(obj){
    return this.getUid()
      .then(uid => {
        return this.af.database.object(`/users/${uid}`).update(obj);
      });
  }
//update profile picture
  uploadPicture(file) {
    return this.getUid()
      .then(uid => {
        let promise = new Promise((resolve, reject) => {
          let fileName = uid+'.jpg';
          let pictureRef = firebase.storage().ref(`/profile/${fileName}`);
          let uploadTask = pictureRef.put(file);
          uploadTask.on('state_changed',function(snapshot){

          },function(err) {
            reject(err);
          },function(){
            var downloadURL = uploadTask.snapshot.downloadURL;
            resolve(downloadURL);
          });
        });
        return promise;
      });
  }

}
