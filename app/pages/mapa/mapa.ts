import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Storage, LocalStorage } from 'ionic-angular';
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
  sede: any; // Informacion de una sede seleccionada
  title: string = 'Mapa';

  localStorage: any = new Storage(LocalStorage);

  private markerUser: any;

  constructor(
    private nav: NavController,
    private connectivityService: ConnectivityService,
    private alertCtrl: AlertController,
    private _navParams: NavParams,
    private loadingCtrl: LoadingController) {
  }

  ionViewLoaded() {
    console.log('In view loaded');
    this.loadAll();
  }

  loadAll() {
    this.unidad = this._navParams.data.unidad;
    this.sede = this._navParams.data.sede;

    console.log('Unidad=>', this.unidad);
    console.log('Sede  =>', this.sede);

    this.showLoading('Cargando mapa...');

    if (this.connectivityService.isOffline()) {
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

      let mapOptions = {};
      if (this.sede) {
        latLng = new google.maps.LatLng(this.sede.posicion.x, this.sede.posicion.y);
        mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      } else {
        mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.markerUser = this.addMarker('Mi posicion', position.coords.latitude, position.coords.longitude, 'user');
      console.log('Marker User: ', this.markerUser);

    }).catch(err => {
      console.log('No se pudo obtener posicion.');

      let latLng = new google.maps.LatLng(position_udla.coords.latitude, position_udla.coords.longitude);

      let mapOptions = {};
      if (this.sede) {
        latLng = new google.maps.LatLng(this.sede.posicion.x, this.sede.posicion.y);
        mapOptions = {
          center: latLng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      } else {
        mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }).then(_ => {
      this.addMarker('Universidad de la Amazonia', position_udla.coords.latitude, position_udla.coords.longitude, 'udla');

      if (this.unidad) {
        console.log('Add marker unidad.');
        this.addMarker(this.unidad.nombrerecurso, this.unidad.posicion.x, this.unidad.posicion.y, 'pin');
        this.title = this.unidad.nombrerecurso;
      } else if (this.sede) {
        console.log('Add marker sede.');
        this.addMarker(this.sede.nombresede, this.sede.posicion.x, this.sede.posicion.y, 'pin');
        this.title = this.sede.nombresede;
      } else { // Cargar todos los puntos del mapa si no se ha seleccionado unidad y sede
        /*this.localStorage.get('recursos').then((recusos_list) => {
          let aux = JSON.parse(recusos_list);
          aux.map(item => {
            this.addMarker(item.nombrerecurso, item.posicion.x, item.posicion.y, 'pin');
          });
        });*/
      }
    });

  }

  addMarker(title: string = 'Marker', lat: number, lng: number, icon: string = 'pin') {
    var marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: this.map,
      title: title,
      icon: this.getUrlIcon(icon)
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

  private getUrlIcon(name: string) {
    switch (name) {
      case 'pin':
        return 'images/icons/pin.png';
      case 'udla':
        return 'images/icons/udla.png';
      case 'user':
        return 'images/icons/user.png';
      default:
        return 'images/icons/pin.png';
    }
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
