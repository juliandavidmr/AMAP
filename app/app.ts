import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {FIREBASE_PROVIDERS,
  defaultFirebase,
  FirebaseAuth} from 'angularfire2';

import { LoginPage } from './pages/login/login';
import { ChatPage } from './pages/chat/chat';
import { DashboardPage } from './pages/dashboard/dashboard';
import { SedesPage } from './pages/sedes/sedes';
import { MapaPage } from './pages/mapa/mapa';
import { ConnectivityService } from './providers/connectivity-service/connectivity-service';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DashboardPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public auth: FirebaseAuth) {
    this.auth.subscribe((data) => {
      if (data) {
        this.rootPage = DashboardPage;
      }
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage, icon: 'ionic' },
      { title: 'Sedes', component: SedesPage, icon: 'list-box' },
      { title: 'Mapa', component: MapaPage, icon: 'pin' },
      { title: 'Chat', component: ChatPage, icon: 'ios-chatbubbles-outline' }
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
    mode: 'ios'
  });
