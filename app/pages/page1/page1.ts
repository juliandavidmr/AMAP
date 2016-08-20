import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController, public auth: FirebaseAuth) {
  }
}
