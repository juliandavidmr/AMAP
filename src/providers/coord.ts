import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Coord provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


export interface PointInterface {
  x: number;
  y: number;
}

@Injectable()
export class Coord {

  constructor(public http: Http) {
    console.log('Hello Coord Provider');
  }

  calcPosition(punto: PointInterface, punto2: PointInterface): Number {
    let lat = punto.y;
    let lng = punto.x;

    let distance = this.getDistanceFromLatLonInKm(lat, lng, punto2.x, punto2.y);

    return distance;
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

}
