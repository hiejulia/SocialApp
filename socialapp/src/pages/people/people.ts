import { NavController, NavParams } from 'ionic-angular';
import {Component} from '@angular/core';
import {UserProvider} from '../../providers/user';
import {SocialProvider} from '../../providers/social';
import {UtilProvider} from '../../providers/util';
import {FirebaseListObservable} from 'angularfire2';
import {UserProfilePage} from '../user-profile/user-profile';


/*
  Generated class for the People page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {
  users;
  uid;
  followersObservable:FirebaseListObservable<any>;
  followers;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private userProvider:UserProvider,private socialProvider: SocialProvider, private util: UtilProvider) {

      this.userProvider.getUid()
    .then(uid => {
      this.uid = uid;
    });
    this.users = this.userProvider.searchUser("");
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PeoplePage');
  // }


getUser(ev) {
    let username = ev.target.value;
    this.users = this.userProvider.searchUser(username);
  }

  followUser(user) {
    this.socialProvider.followUser(user)
    .then(()=> {
      let toast = this.util.getToast("You are now following " + user.name);
      // this.navController.present(toast);
      toast.present();//fix bugs here
    });
  }
  userProfile(user) {
    console.log(user);
    this.navCtrl.push(UserProfilePage, {uid:user.$key});//push page from nav
  }
}
