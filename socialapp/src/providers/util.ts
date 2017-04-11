import { Injectable,Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Alert,Toast}from 'ionic-native';
import {Camera} from 'ionic-native';
import { AlertController,Platform } from 'ionic-angular';

/*
  Generated class for the Util provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilProvider {

  constructor(public http: Http,public Alert: AlertController,private platform: Platform) {
    console.log('Hello Util Provider');
  }
  //doAlert
  doAlert(title, message, buttonText){
    let alert =this.Alert.create({
      title:title,
      subTitle:message,
      buttons:[buttonText]
    });
    return alert;

  }

  getToast(message){
    let toast = Toast.create({
      message:message,
      duration:2000
    });
    return toast;
  }

  //dataURILtoBlob()
  dataURItoBlob(dataURI){
    //convert base 64 to raw binary data held in a string
    let byteString = atob(dataURI.split(','[1]));
    //separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //write the bytes of the string to an array buffer
    let ab =new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for(let i =0;i<byteString.length;i++)
    {
ia[i] = byteString.charCodeAt(i);
    }
    //write the arraybuffer to a blob 
     let bb = new Blob([ab], {type:mimeString});
     return bb;//return the blob//convert to the image

  }

  //getPic
  getPicture(sourceType=0,allowEdit=true){
    let base64Picture;
    let options = {
      destination:0,
      sourceType:sourceType,
      encodingType:0,
      mediaType:0,
      allowEdit:allowEdit
    };
    let promise = new Promise((resolve, reject) => {
      Camera.getPicture(options).then((imgData) => {
        base64Picture = "data:image/jpeg;base64,"+imgData;
        resolve(base64Picture);
      },(err) => {
        reject(err);
      });
    });
    return promise;
  }



}
