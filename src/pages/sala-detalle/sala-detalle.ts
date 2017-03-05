import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Recursos } from '../../interfaces/RecursoInterface';
import { MapaPage } from '../mapa/mapa';

@Component({
  selector: 'page-sala-detalle',
  templateUrl: 'sala-detalle.html'
})
export class SalaDetallePage {

  public detalle: Recursos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.detalle = this.navParams.data;

    console.log(this.detalle);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacioneDetallePage');
  }

  openMapa() {
    this.navCtrl.push(MapaPage, this.detalle)
  }

}
