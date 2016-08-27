import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, LocalStorage } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {FIREBASE_PROVIDERS,
  defaultFirebase,
  FirebaseAuth} from 'angularfire2';
import { ConnectivityService } from './providers/connectivity-service/connectivity-service';

import { LoginPage } from './pages/login/login';
import { ChatPage } from './pages/chat/chat';
import { DashboardPage } from './pages/dashboard/dashboard';
import { SedesPage } from './pages/sedes/sedes';
import { MapaPage } from './pages/mapa/mapa';
import { IntroPage } from './pages/intro/intro';
import { AcercadePage } from './pages/acercade/acercade';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DashboardPage;
  local: any = new Storage(LocalStorage)

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public auth: FirebaseAuth) {
    this.local.get('introShown').then((result) => {
      console.log('Result: ', result);
      if (result) {
        this.rootPage = DashboardPage;
      } else {
        this.local.set('introShown', true);
        this.rootPage = IntroPage;
      }
    });

    /*this.auth.subscribe((data) => {
      if (data) {
        this.rootPage = DashboardPage;
      }
    });*/

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage, icon: 'ionic' },
      { title: 'Sedes', component: SedesPage, icon: 'list-box' },
      { title: 'Mapa', component: MapaPage, icon: 'pin' },
      { title: 'Foro Chat', component: ChatPage, icon: 'ios-chatbubbles-outline' },
      { title: 'Intro', component: IntroPage, icon: 'book' },
      { title: 'Login', component: LoginPage, icon: 'ios-log-in-outline' },
      { title: 'Acerca de', component: AcercadePage, icon: 'information' }
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
  }), ConnectivityService], {
    mode: 'md'
  });
