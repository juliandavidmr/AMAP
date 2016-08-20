import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig} from 'angularfire2';

import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';
import { LoginPage } from './pages/login/login';
import { DashboardPage } from './pages/dashboard/dashboard';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DashboardPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Page dos', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyCOi2TytLkoP4m0KAcygF8R1LgOL3LTG98",
    authDomain: "amap-945a3.firebaseapp.com",
    databaseURL: "https://amap-945a3.firebaseio.com",
    storageBucket: "amap-945a3.appspot.com",
  })], {
    mode: 'ios'
  });
