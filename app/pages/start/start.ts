import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage, LocalStorage} from 'ionic-angular';
import {HomePage} from '../home/home';
import {SignInPage} from '../auth/sign_in';

@Component({
  templateUrl: 'build/pages/start/start.html'
})
export class StartPage {
    local: any;
    type: any;

  constructor(public nav: NavController, navParams: NavParams) {
    
  }
  
  
  
  selectType(type) {
  this.local = new Storage(LocalStorage);
    let self = this;
    //this.type = navParams.get('type');
    this.local.get('authorized').then(function(isAuthorized) {
    console.log(isAuthorized);
        if (isAuthorized != 'true') {
            self.nav.push(SignInPage, { type: type });
        } else {
            self.nav.push(HomePage, { type: type });
        }
      
    })
    
  }
}
