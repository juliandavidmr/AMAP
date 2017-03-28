import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SalasPage } from '../salas/salas';
import { MapaPage } from '../mapa/mapa';
import { SedesPage } from '../sedes/sedes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab2Root: any = AboutPage;
  Salas: any = SalasPage;
  tabMapa: any = MapaPage;
  tabSedes: any = SedesPage;
}
