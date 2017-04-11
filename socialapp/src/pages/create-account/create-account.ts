import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {FormBuilder, Validators,FormControl} from '@angular/forms';
import {validateEmail} from '../validators/email';
import {AuthProvider} from '../../providers/auth';
import {UserProvider} from '../../providers/user';
import {UtilProvider} from '../../providers/util';
// import {FirebaseAuth} from 'angularfire2';
import {Storage, LocalStorage} from 'angular';
import {Inject} from '@angular/core';
import {AngularFire} from 'angularfire2';

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
  password:FormControl;
  authProvider;
  storage = new Storage(localStorage);

  constructor(public navCtrl: NavController, public navParams: NavParams,
  form:FormBuilder,  auth: AuthProvider,  

  
  
  
  
  ) {

    this.password = new Control("",Validators.compose([Validators.required, Validators.minLength(6)]));
        this.createForm = form.group({
            username: ["", Validators.required],
            name: ["", Validators.required],
            email: ["",Validators.compose([Validators.required, validateEmail])],
            password:this.password,
            repass: ["", Validators.required]
        });
        this.auth = auth;

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CreateAccountPage');
  // }


  //create account
  // createAccount(){
  //   let {password,repass,username,name,email} = this.createAccountForm.value;
  //   username = username.trim().toLowerCase();
  //   if(password !== repass){
  //     let alert = this.utilProvider.doAlert("Error",'Password does not match','OK');
  //     // this.navCtrl.present(alert);//
  //     // this.navCtrl.present({
  //       alert.present();//present alert 

  //     // });
  //   } else {
  //     //check is user name is valid

  //     //if not =>alert


  //     //if valid => create accoumt using fbAuth
      

  //   }
  // }

  createAccount() {
        let {password, repass, username, name, email} = this.createForm.value;
        username = username.toLowerCase();
        if(password !== repass) {
            let alert = this.util.doAlert("Error", "Password doesn't matched", "Ok");
            this.nav.present(alert);
        } else {
            this.userProvider.isUsernameFree(username)
            .then(value => {
                if(value === false) {
                    let alert = this.util.doAlert("Error", "Username not available", "Ok");
                    this.nav.present(alert);
                } else {
                    // Create Account
                    this.fbAuth.createUser({email: email, password: password})
                    .then(value => {
                        this.userProvider.saveUser(value);
                        this.userProvider.createUser({email: email, username: username, name: name});
                    });
                }
            });
        }
    }
}
