import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/detalle/detalle.html',
})
export class DetallePage {

  public posicion;
  private subscription;
  private punto: any;
  distancia: number = 0;
  direccion: any;
  altitud: any;
  velocidad: any;
  detalle: string = "Detalle";
  loader: any;

  constructor(
    private navCtrl: NavController,
    private _navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.showLoading('Calculando mi posición...');

    this.punto = this._navParams.data.posicion;
    console.log(this._navParams.data);
    this.detalle = this._navParams.data;

    Geolocation.getCurrentPosition().then(pos => {
      this.subscription = Geolocation.watchPosition().subscribe(pos => {
        console.log('=>', pos);

        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.posicion = pos.coords;

        this.distancia = this.calcPosition(this.punto);
        this.direccion = this.getBearing(this.punto.x, this.punto.y, this.posicion.latitude, this.posicion.longitude);
        this.velocidad = pos.coords.speed;
        this.altitud = pos.coords.altitude;

        this.loader.dismiss();
      });
    }).catch((error) => {
      this.loader.dismiss();
      console.log('ERROR', error);
      this.presentAlert();
    });
  }

  ngOnDestroy() {
    console.log("Destruido");

    try {
      this.subscription.unsubscribe();
    } catch (error) {
      console.log("Error al unsubscribirse: ", error);
    }
  }

  showLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });

    this.loader.present();
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
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  radians(n) {
    return n * (Math.PI / 180);
  }

  degrees(n) {
    return n * (180 / Math.PI);
  }

  getBearing(startLat, startLong, endLat, endLong) {
    startLat = this.radians(startLat);
    startLong = this.radians(startLong);
    endLat = this.radians(endLat);
    endLong = this.radians(endLong);

    var dLong = endLong - startLong;

    var dPhi = Math.log(Math.tan(endLat / 2.0 + Math.PI / 4.0) / Math.tan(startLat / 2.0 + Math.PI / 4.0));
    if (Math.abs(dLong) > Math.PI) {
      if (dLong > 0.0) {
        dLong = -(2.0 * Math.PI - dLong);
      } else {
        dLong = (2.0 * Math.PI + dLong);
      }
    }

    return (this.degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'GPS Desactivado',
      subTitle: 'Ups! al parecer tienes el GPS inhabilitado. Activalo e intenta de nuevo.',
      buttons: ['OK']
    });
    alert.present();
  }

}
