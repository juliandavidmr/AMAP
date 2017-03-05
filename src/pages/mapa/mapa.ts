import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import L from 'leaflet';

import { Recursos } from '../../interfaces/RecursoInterface';
import { ServiceRecursos } from '../../providers/service-recursos';

/*
  Generated class for the Mapa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  map: any;
  center: Array<Number> = [
    1.6208841, -75.6051835
  ]
  zoom: Number = 18;

  greenIcon = L.icon({
    iconUrl: 'assets/images/pin2.png',

    iconSize: [43, 45], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  seleccion: Recursos; // Almacena la informacion de un recurso seleccionado previamente

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recursos: ServiceRecursos
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.loadMap();

    if (this.navParams.data.posicion != undefined) { // Se ha seleccionado un recurso 
      console.log(this.navParams.data)

      this.seleccion = this.navParams.data;
      let coord = [this.seleccion.posicion.x, this.seleccion.posicion.y]

      this.addMarker(coord, this.seleccion.nombrerecurso)
    } else {
      let rcs_list = this.recursos.getListRecursos() as Recursos[];
      rcs_list.map(item => {
        this.addMarker([item.posicion.x, item.posicion.y], item.nombrerecurso);
      })
    }
  }

  /**
   * Carga el mapa
   */
  loadMap() {
    if (this.map == undefined) {
      this.map.remove();
      this.map = L.map('map').setView(this.center, this.zoom);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

      this.map.on('click', (e) => {
        let marker = L.marker(e.latlng)
          .bindPopup('Mensaje')
          .addTo(this.map)
          .openPopup();
      });

      this.addMarker([1.6221243, -75.5961411], 'Florencia, Caquetá');
    }
  }

  addMarker(coord: Array<Number>, message: string = 'Mensaje') {
    // L.marker([50.5, 30.5]).addTo(this.map);
    L.marker(coord, { icon: this.greenIcon }).addTo(this.map)
      .bindPopup(message)
      .openPopup();
  }
}