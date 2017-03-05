import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MapaPage } from '../mapa/mapa';

import { ServiceRecursos } from '../../providers/service-recursos';
import { Load } from '../../providers/load';

import { Sedes } from '../../interfaces/SedeInterface';

@Component({
  selector: 'page-sedes',
  templateUrl: 'sedes.html'
})
export class SedesPage {

  public list_sedes: Sedes[];
  public search: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recursos: ServiceRecursos,
    public load: Load
  ) {
    this.initializeItems();
  }

  initializeItems() {
    this.list_sedes = this.recursos.getListSedes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalasPage');
  }

  openDetalle(estacion_params: any) {
    this.navCtrl.push(MapaPage, estacion_params);
  }

  onInput(event: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.list_sedes = this.list_sedes.filter((item) => {
        return (item.nombresede.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
