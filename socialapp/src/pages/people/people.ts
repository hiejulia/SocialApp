import { NavController, NavParams } from 'ionic-angular';
import {Component} from '@angular/core';
import {UserProvider} from '../../providers/user-provider/user-provider';
import {SocialProvider} from '../../providers/social-provider/social-provider';
import {UtilProvider} from '../../providers/utils';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
  }

}
