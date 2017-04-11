import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ViewController, ActionSheet} from 'ionic-angular';
import {SocialProvider} from '../../providers/social';
import {UtilProvider} from '../../providers/util';

import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  postContent:string;
    image = null;
    blobImage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private viewController:ViewController, 
       
        private socialProvider: SocialProvider, 
        private util:UtilProvider,
        public actionSheetCtrl: ActionSheetController) {

        }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PostPage');
  // }

dismiss() {
        this.viewController.dismiss();
    }
sendPost() {
        let obj = {content: this.postContent, image:this.image};
        this.socialProvider.createPost(obj)
        .then((postKey) => {
            console.log(postKey);
            // if Image is Added
            if(this.blobImage) {
                this.socialProvider.postImage(postKey, this.blobImage)
                .then(url => {
                    this.socialProvider.updatePost(postKey,{image:url});
                });
            }
            this.reset();
            this.dismiss();
        });
    }

    addImage() {
        this.presentPictureSource()
        .then(source => {
            let sourceType:number = Number(source);
            return this.util.getPicture(sourceType, false);
        })
        .then(imageData => {
            this.blobImage = this.util.dataURItoBlob(imageData);
        });
    }

    presentPictureSource() {
        let promise = new Promise((res, rej) => {
            let actionSheet =this.actionSheetCtrl.create({
            title: 'Select Picture Source',
            buttons: [
                { text: 'Camera', handler: () => { res(1); } },
                { text: 'Gallery', handler: () => { res(0); } },
                { text: 'Cancel', role: 'cancel', handler: () => { rej('cancel'); } }
            ]
            });
            // this.navCtrl.present(actionSheet);
            actionSheet.present();
        });
        return promise;
    }

    reset() {
        this.postContent = "";
        this.image = null;
        this.blobImage = null;
    }
}
