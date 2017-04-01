import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {TimelinePage} from '../timeline/timeline';
import {PeoplePage} from '../people/people';
import {AccountPage} from '../account/account';


/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
   private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.tab1Root = TimelinePage;
    this.tab2Root = PeoplePage;
    this.tab3Root = AccountPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
