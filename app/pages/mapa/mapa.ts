import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  templateUrl: 'build/pages/mapa/mapa.html',
})
export class MapaPage {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any;
  loader: any;
  unidad: any; // Informacion de un recurso fisico seleccionado
  title: string = 'Mapa';

  private markerUser: any;

  constructor(
    private nav: NavController,
    private connectivityService: ConnectivityService,
    private alertCtrl: AlertController,
    private _navParams: NavParams,
    private loadingCtrl: LoadingController) {
    this.unidad = this._navParams.data.unidad;
    console.log('=>', this.unidad);

    this.showLoading('Cargando mapa...');

    if (connectivityService.isOffline()) {
      this.loader.dismiss();
      this.presentAlert('Sin conexión', 'Ups! Parece que no tienes conexión a internet.');
    }

    this.loadGoogleMaps();
  }

  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google === "undefined" || typeof google.maps === "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("online, loading map");

        // Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        };

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);
        this.loader.dismiss();
      }
    } else {
      if (this.connectivityService.isOnline()) {
        console.log("showing map");
        this.initMap();
        this.enableMap();
      } else {
        console.log("disabling map");
        this.disableMap();
        this.loader.dismiss();
      }
    }

  }

  initMap() {
    let position_udla = {
      coords: {
        latitude: 1.619601,
        longitude: -75.604045
      }
    };

    this.mapInitialised = true;

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.markerUser = this.addMarker('Mi posicion', position.coords.latitude, position.coords.longitude);
      console.log('Marker User: ', this.markerUser);

    }).catch(err => {
      console.log('No se pudo obtener posicion.');

      let latLng = new google.maps.LatLng(position_udla.coords.latitude, position_udla.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }).then(_ => {
      this.addMarker('Universidad de la Amazonia', position_udla.coords.latitude, position_udla.coords.longitude);

      if (this.unidad) {
        this.addMarker(this.unidad.nombrerecurso, this.unidad.posicion.x, this.unidad.posicion.y);
        this.title = this.unidad.nombrerecurso;
      }
    });

  }

  addMarker(title: string = 'Marker', lat: number, lng: number) {
    var marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: this.map,
      title: 'Universidad de la Amazonia!'
    });

    var infowindow = new google.maps.InfoWindow({
      content: title,
      maxWidth: 200
    });

    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });

    return marker;
  }

  disableMap() {
    console.log("disable map");
  }

  enableMap() {
    console.log("enable map");
    this.loader.dismiss();
  }

  addConnectivityListeners() {
    var onOnline = () => {
      setTimeout(() => {
        if (typeof google === "undefined" || typeof google.maps === "undefined") {
          this.loadGoogleMaps();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);
    };

    var onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
  }

  showLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });

    this.loader.present();
  }

  presentAlert(title: string, description: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: description,
      buttons: ['OK']
    });
    alert.present();
  }

}
