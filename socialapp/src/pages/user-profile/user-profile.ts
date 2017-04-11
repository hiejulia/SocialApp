import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UtilProvider} from '../../providers/util';
import {UserProvider} from '../../providers/user';
import {SocialProvider} from '../../providers/social';


/*
  Generated class for the UserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {
  user = {};
  profile = {};
  uid:String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private util: UtilProvider,  private socialProvider: SocialProvider
  ) {
      this.uid = navParams.get('uid');
      console.log(this.uid);
      this.socialProvider.getUser(this.uid)
      .subscribe(user => {
        this.user = user;
        console.log(user);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }
  followUser(user) {
       this.socialProvider.followUser(user);
  }

}
