import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FirebaseAuth, AngularFire, FirebaseListObservable } from 'angularfire2';
import { Geolocation } from 'ionic-native';

import { DetallePage } from '../detalle/detalle';
import { MapaPage } from '../mapa/mapa';

@Component({
  templateUrl: 'build/pages/sedes/sedes.html',
})
export class SedesPage {

  ListSedes: FirebaseListObservable<any>;
  ListSedes_aux: FirebaseListObservable<any>;
  loader: any;
  public subscription;
  posicion: any;
  distancia: number = 0;

  constructor(
    public af: AngularFire,
    public auth: FirebaseAuth,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) {
    this.showLoading();

    this.subscription = Geolocation.watchPosition().subscribe(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.posicion = pos.coords;

      //this.distancia = this.calcPosition(this.punto);
    });
  }

  ngOnDestroy() {
    console.log('Subscription Droped');
    this.subscription.unsubscribe();
  }

  onPageDidEnter() {
    this.auth.subscribe((data) => {
      if (data) {
        //console.log(data);
      }
      this.loader.dismiss();
      this.ListSedes = this.af.database.list('/sedes');
      console.log(this.ListSedes);
    });
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });

    this.loader.present();
  }

  ngOnInit() {

  }

  calcPosition(punto = { x: '', y: '' }) {
    if (this.posicion) {

      let lat = punto.x;
      let lng = punto.y;

      let distance = this.getDistanceFromLatLonInKm(lat, lng, this.posicion.latitude, this.posicion.longitude);

      return distance * 1000;
    } else {
      return 0;
    }
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6378.137;
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

  openDetalle(params) {
    this.navCtrl.push(DetallePage, params);
  }

  openMap(item: any) {
    this.navCtrl.push(MapaPage, { sede: item });
  }
}
