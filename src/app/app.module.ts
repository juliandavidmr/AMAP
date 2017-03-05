import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

/* Pages */
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SalaDetallePage } from '../pages/sala-detalle/sala-detalle';
import { SalasPage } from '../pages/salas/salas';
import { MapaPage } from '../pages/mapa/mapa';

/* Providers */
import { ServiceRecursos } from '../providers/service-recursos';
import { Load } from '../providers/load';
import { DateMethod } from '../providers/date';

/* Components */
import { ParallaxHeader } from '../components/parallax-header/parallax-header';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    SalaDetallePage,
    SalasPage,
    ParallaxHeader,
    MapaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Atras',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'top',
      pageTransition: 'ios'
    }, {}
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    SalaDetallePage,
    SalasPage,
    MapaPage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  },
    ServiceRecursos,
    Load,
    DateMethod
  ]
})
export class AppModule { }