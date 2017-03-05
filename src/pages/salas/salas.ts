import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SalaDetallePage } from '../sala-detalle/sala-detalle';

import { ServiceRecursos } from '../../providers/service-recursos';
import { Load } from '../../providers/load';

/*
  Generated class for the Estaciones page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-salas',
  templateUrl: 'salas.html'
})
export class SalasPage {

  public list_salas: any = [];
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
    this.list_salas = this.recursos.getListRecursos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalasPage');
  }

  openDetalleEstacion(estacion_params: any) {
    this.navCtrl.push(SalaDetallePage, estacion_params);
  }

  onInput(event: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.list_salas = this.list_salas.filter((item) => {
        return (item.nombrerecurso.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
