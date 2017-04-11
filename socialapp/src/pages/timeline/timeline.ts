import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {AuthProvider} from '../../providers/auth';
import {UserProvider} from '../../providers/user';
import {SocialProvider} from '../../providers/social';
import {UtilProvider} from '../../providers/utils';
import { PostPageModal } from '../post/post';
/*
  Generated class for the Timeline page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  posts:any;
  userInput;
  feeds:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
   private socialProvider: SocialProvider,
   private userProvider: UserProvider,
   private af: AngularFire, private ModalCtrl: ModalController) {
//get the user id
     this.userProvider.getUid() 
    .then(uid => { 
       firebase.database().ref(`/users/${uid}/feed`) 
       .on('child_added', (snapshot) => { 
         this.feeds.unshift({$key:snapshot.key, $value: 
          snapshot.val()}); 
       }); 
    }); 
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
  }

  openPost(){
    let modal = this.ModalCtrl.create(PostPageModal); 
    modal.present(); 
  }

}
