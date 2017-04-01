import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserProvider} from './user';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Rx';

/*
  Generated class for the Social provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SocialProvider {

  constructor(public http: Http,private userProvider:UserProvider,private af:AngularFire) {
    console.log('Hello Social Provider');
  }
  //follow users
  followUser(userData){
    return this.userProvider.getUid()
      .then((uid:string) => {
        let otherUserID = userData.$key;
        let followingList =this.af.database.object(`/users/&{uid}/following`);
        followingList.update({[otherUserID]:true});
        let followerList =this.af.database.object(`/users/${otherUserID}/followers`);
        return followerList.update({[uid]:true});
      });
  }
  //get Post
  getPost(postID){
    return this.af.database.object(`/posts/${postID}`);
  }

  //post image via postID
  postImage(postID, imageData){
    let promise = new Promise((resolve, reject) => {
      let fileName = postID+".jpg";
      let uploadTask =firebase.storage().ref(`/posts/${fileName}`).put(imageData);
      uploadTask.on('state_changed',function(snapshot){

      },function(err){
        reject(err);
      },function(){
        var downloadURL =uploadTask.snapshot.downloadURL;
        resolve(downloadURL);
      });
    });
    return promise;
  }

  updatePost(postID, obj){
    return this.af.database.object(`/posts/${postID}`).update(obj);
  }
  //create post
  createPost(postData){
    let uid;
    let posts = this.af.database.list(`/posts`);
    return this.userProvider.getUid()
      .then(userid => {
        uid=userid;
        postData.from = uid;
        postData.timestamp =firebase.database['ServerValue'].TIMESTAMP;
        return posts.push(postData).key;
      })
      .then(postKey => {
        let userFeed =this.af.database.object(`/users/${uid}/feed`);
        userFeed.update({postKey:true});

        this.af.database.list(`/users/${uid}/followers`)
          .subscribe(followers => {
            followers.forEach(follower => {
              this.af.database.object(`/users/${follower.$key}/feed`).update({postKey:true});
            });
          });
          return Promise.resolve(postKey);
      });

  }

  //get user via uid
  getUser(uid){
    return this.af.database.object(`/users/${uid}`);
  }


}
