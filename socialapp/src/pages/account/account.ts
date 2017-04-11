import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheet } from 'ionic-angular';
import {FirebaseAuthConfig,FirebaseAuthState,AngularFire} from 'angularfire2';
import {UtilProvider} from '../../providers/util';
import {UserProvider} from '../../providers/user';
import {SocialProvider} from '../../providers/social';
import {AuthProvider} from '../../providers/auth';
import { ActionSheetController } from 'ionic-angular'

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


  constructor(public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams,private af:AngularFire,
private util: UtilProvider,private userProvider: UserProvider, private socialProvider: SocialProvider,
private authProvider:AuthProvider) {
        this.userProvider.getUid()
    .then(uid => {
      this.socialProvider.getUser(uid)
      .subscribe(user => {
        this.user = user;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }


  //updateProfile


  //log out
  logout(){
    this.authProvider.logout();
  }

  //update picture
  updatePicture(){
     this.presentPictureSource()
    .then(source => {
      let sourceType:number = Number(source);
      return this.util.getPicture(sourceType);
    })
    .then(imageData => {
      var blobImage = this.util.dataURItoBlob(imageData);
      return this.userProvider.uploadPicture(blobImage);
    })
    .then(imageURL => {
      return this.userProvider.updateProfile({avatar: imageURL});
    })
    .then(()=> {
      let toast = this.util.getToast('Your Picture is updated');
      toast.present();
    });
  }

  presentPictureSource() {
    let promise = new Promise((res, rej) => {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Select Picture Source',
          buttons: [
            { text: 'Camera', handler: () => { res(1); } },
            { text: 'Gallery', handler: () => { res(0); } },
            { text: 'Cancel', role: 'cancel', handler: () => { rej('cancel'); } }
          ]
        });
        actionSheet.present();
        // this.navController.present(actionSheet);
    });
    return promise;
  }

  updateProfile() {
    let toast = this.util.getToast("Your Profile is updated");
    this.userProvider.updateProfile({name: this.user['name'], about: this.user['about']})
    .then(()=> {
      // this.navController.present(toast);
      toast.present();
    });
  }



}
