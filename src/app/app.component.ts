import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { AcercadePage } from '../pages/acercade/acercade';
import { ChatPage } from '../pages/chat/chat';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { MapaPage } from '../pages/mapa/mapa';
import { SedesPage } from '../pages/sedes/sedes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Pagina 1', component: Page1 },
      { title: 'Pagina 2', component: Page2 },
      { title: 'Chat', component: ChatPage },
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Intro', component: IntroPage },
      { title: 'Login', component: LoginPage },
      { title: 'Mapa', component: MapaPage },
      { title: 'Sedes', component: SedesPage },
      { title: 'Acerca de', component: AcercadePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
