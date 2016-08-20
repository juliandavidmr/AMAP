import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/detalle/detalle.html',
})
export class DetallePage {

  private posicion;

  constructor(private navCtrl: NavController) {

    let watch = Geolocation.watchPosition().subscribe(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.posicion = pos.coords;
    });

  }

  calcPosition(punto = { x: "", y: "" }) {
    let lat = punto.x;
    let lng = punto.y;

    let distance = this.getDistanceFromLatLonInKm(lat, lng, this.posicion.latitude, this.posicion.longitude);

    return distance * 1000;
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }


}
