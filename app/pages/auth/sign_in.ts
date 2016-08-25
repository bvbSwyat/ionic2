import {Component} from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';
import {SignUpPage} from '../auth/sign_up';
import {Storage, LocalStorage, ToastController } from 'ionic-angular';
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/auth/sign_in.html'
})
export class SignInPage {
    signInForm: any;
    local: any;
    type: any
    
    constructor(public nav: NavController
                , private builder: FormBuilder, navParams: NavParams) {
        var self = this;
        this.type = navParams.get('type');
        this.local = new Storage(LocalStorage);
        this.local.get('authorized').then(function(isAuthorized) {
        console.log(333, isAuthorized);
            if (isAuthorized == 'true') {
                //nav.push(HomePage, {type: self.type});
            }
        });

        this.applySignInForm();
    }

    goToSignUp() {
      this.nav.push(SignUpPage);
      this.applySignInForm();
    }
  
    applySignInForm() {
        this.signInForm = this.builder.group({
          'name': ['', Validators.required],
          'password': ['', [Validators.required]]
        });
    }
    
    //signedIn() {
     //   this.local.get('authorized').then(function(isAuthorized) {
     //       if (isAuthorized == 'true') {
    //            self.nav.push(HomePage, {type: self.type});
    //        }
    //    })
    //}
    
  
    signIn() {
        let self = this;
        let username = this.signInForm.controls.name.value;
        let password = this.signInForm.controls.password.value;
        this.local.set('username', username);
        this.local.set('password', password);
        this.local.set('authorized', true);
        
        this.local.get('authorized').then(function(isAuthorized) {
            if (isAuthorized == 'true') {
                self.nav.push(HomePage, {type: self.type});
            }
        })
    }
}