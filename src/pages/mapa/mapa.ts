import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceRecursos } from '../../providers/service-recursos';
import L from 'leaflet';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  map: any = {};
  center: Array<Number> = [
    1.620281, -75.604768
  ]
  zoom: Number = 17;

  public list_recursos = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recursos: ServiceRecursos) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.loadMap();

    this.loadRecursos();
  }

  toIcon(tiporecurso: string): string {
    switch (tiporecurso) {
      case 'Sala': return 'assets/images/reuniones.jpg';
      case 'Auditorio': return 'assets/images/auditorio.png';
      case 'Entradas': return 'assets/images/puerta.png';
      case 'Laboratorio': return 'assets/images/lab.png';
      case 'Camara': return 'assets/images/cam.png';
      case 'Recreacion': return 'assets/images/fut.png';
      case 'Cafeteria': return 'assets/images/taza.png';
      case 'Parqueadero': return 'assets/images/parqueadero.png';
      case 'Biblioteca': return 'assets/images/library.png';
      case 'Papeleria': return 'assets/images/papeleria.png';
      default: return 'assets/images/reuniones.jpg';
    }
  }

  /**
   * Carga las estacioens en el mapa
   */
  loadRecursos() {
    this.recursos.getListRecursos().map((item, index) => {
      const html_content = `
        ${item.nombrerecurso} <br/>
        <ul>
          <li>${(item.descripcion == "" && !!item.descripcion)? 'No asignado' : item.descripcion}</li>
          <li>Bloque ${item.numbloque <= 0 ? 'no asignado' : item.numbloque}</li>
          <li>Piso ${item.numpiso}</li>
          <li>Tipo ${item.tiporecurso}</li>
        </ul>
      `;
      this.addMarker([
        item.posicion.x,
        item.posicion.y],
        html_content,
        this.toIcon(item.tiporecurso)
      );
    })
  }

  /**
   * Carga el elemento del mapa
   */
  loadMap() {
    this.map = L.map('map').setView(this.center, this.zoom);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">SAT Florencia</a> GIECOM'
    }).addTo(this.map);

    L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

    // Detecta cuando se hace click en el mapa
    this.map.on('click', (e) => {
      /*
      //marker Default
      let marker = L.marker(e.latlng)
        .bindPopup('Mensaje')
        .addTo(this.map)
        .openPopup();
      */
    });

    // Marcador por defecto
    // this.addMarker(this.center, 'Florencia, Caquetá');
  }

  /**
   * Añade un marcador al mapa
   * @param coord Coordenadas
   * @param message Mensaje a mostrar en popup
   */
  addMarker(coord: Array<Number | String>, message: string = 'Mensaje', icon?: string): void {
    // Configuracion del mapa
    var greenIcon = L.icon({
      iconUrl: icon || 'assets/images/pin2.png',
      iconSize: [25, 30], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    // L.marker([50.5, 30.5]).addTo(this.map);
    L.marker(coord, { icon: greenIcon }).addTo(this.map)
      .bindPopup(message)
      .openPopup();
  }
}