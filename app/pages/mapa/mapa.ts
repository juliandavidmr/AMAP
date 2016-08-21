import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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

  constructor(private nav: NavController, private connectivityService: ConnectivityService, private loadingCtrl: LoadingController) {
    this.showLoading('Cargando mapa...');
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google === "undefined" || typeof google.maps === "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

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

    this.mapInitialised = true;

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    });

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
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
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
}
