import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

/* Pages */
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { SalaDetallePage } from '../pages/sala-detalle/sala-detalle';
import { SalasPage } from '../pages/salas/salas';
import { MapaPage } from '../pages/mapa/mapa';
import { SedesPage } from '../pages/sedes/sedes';

/* Providers */
import { ServiceRecursos } from '../providers/service-recursos';
import { Load } from '../providers/load';

import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage,
    SalaDetallePage,
    SalasPage,
    MapaPage,
    SedesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Atras',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'botom',
      pageTransition: 'ios'
    }, {}
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    TabsPage,
    SalaDetallePage,
    SalasPage,
    MapaPage,
    SedesPage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  },
    Geolocation,
    ServiceRecursos,
    Load
  ]
})
export class AppModule { }
