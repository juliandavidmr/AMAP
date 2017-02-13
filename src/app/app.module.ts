import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { AcercadePage } from '../pages/acercade/acercade';
import { ChatPage } from '../pages/chat/chat';
import { ChatDetallePage } from '../pages/chat-detalle/chat-detalle';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DetallePage } from '../pages/detalle/detalle';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { MapaPage } from '../pages/mapa/mapa';
import { SedesPage } from '../pages/sedes/sedes';

import { Connect } from '../providers/connect';
import { Coord } from '../providers/coord';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    AcercadePage,
    ChatPage,
    ChatDetallePage,
    DashboardPage,
    DetallePage,
    IntroPage,
    LoginPage,
    MapaPage,
    SedesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    AcercadePage,
    ChatPage,
    ChatDetallePage,
    DashboardPage,
    DetallePage,
    IntroPage,
    LoginPage,
    MapaPage,
    SedesPage
  ],
  providers: [
    {
      provide: ErrorHandler, useClass: IonicErrorHandler
    },
    Connect,
    Coord
  ]
})
export class AppModule {}
