import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Recursos } from '../../interfaces/RecursoInterface';
import { MapaPage } from '../mapa/mapa';

import { Geolocation } from '@ionic-native/geolocation';
import distance from 'fast-haversine';

interface IPoint {
  lat: Number
  lon: Number
}

@Component({
  selector: 'page-sala-detalle',
  templateUrl: 'sala-detalle.html'
})
export class SalaDetallePage {

  public detalle: Recursos;
  public distancia: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation
  ) {
    this.detalle = this.navParams.data;

    console.log("Recurso abierto: ", this.detalle);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacioneDetallePage');

    this.getMyCoord().then(coords => {
      console.log("Mis coordenadas:", coords);
      var coordrecurso: IPoint = {
        lat: this.detalle.posicion.x,
        lon: this.detalle.posicion.y
      }
      this.distancia = parseFloat( this.calcDistance(coords, coordrecurso)).toFixed(2);
    });
  }

  openMapa() {
    this.navCtrl.push(MapaPage, this.detalle)
  }

  calcDistance(coord1: IPoint, coord2: IPoint): string {
    return distance(coord1, coord2); // quickly returns 14640 m 
  }

  getMyCoord(): Promise<IPoint> {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        resolve({
          lat: resp.coords.latitude,
          lon: resp.coords.longitude
        });
      }).catch((error) => {
        console.log('Error getting location', error);
        return reject(error);
      });
    });
  }
}
