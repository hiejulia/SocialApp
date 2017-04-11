import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {FormBuilder, Validators, Control} from '@angular/forms';
import {validateEmail} from '../validators/email';
import {AuthProvider} from '../../providers/auth-provider/auth-provider';
import {UserProvider} from '../../providers/user-provider/user-provider';
import {UtilProvider} from '../../providers/utils';
// import {FirebaseAuth} from 'angularfire2';
import {Storage, LocalStorage} from 'angular';
import {Inject} from '@angular/core';

/*
  Generated class for the CreateAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html'
})
export class CreateAccountPage {
  createAccountForm;
  authProvider;
  storage = new Storage(localStorage);

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }


  //create account
  createAccount(){
    let {password,repass,username,name,email} = this.createAccountForm.value;
    username = username.trim().toLowerCase();
    if(password !== repass){
      let alert = this.utilProvider.doAlert("Error",'Password does not match','OK');
      // this.navCtrl.present(alert);//
      // this.navCtrl.present({
        alert.present();//present alert 

      // });
    } else {
      //check is user name is valid

      //if not =>alert


      //if valid => create accoumt using fbAuth
      

    }
  }
}
