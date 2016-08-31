import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Storage, LocalStorage } from 'ionic-angular';
import { FirebaseAuth, AngularFire } from 'angularfire2';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';

import { DetallePage } from '../detalle/detalle';
import { MapaPage } from '../mapa/mapa';

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
})
export class DashboardPage {

  ListRecursosFisicos: any = [];
  ListRecursosFisicos_aux: any = [];
  loader: any;
  localStorage: any = new Storage(LocalStorage);

  online: boolean = false;

  constructor(
    public af: AngularFire,
    public auth: FirebaseAuth,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private connectivityService: ConnectivityService,
    private alertCtrl: AlertController
  ) {
  }

  // Called when this page is popped from the nav stack
  onPageWillUnload() {
  }

  onPageWillEnter() {
    this.showLoading();

    if (this.connectivityService.isOnline()) {
      this.online = true;

      this.af.database.list('/recursosfisicos', {
        query: {
          limitToLast: 100,
          orderByKey: true
        }
      }).subscribe(list => {
        this.ListRecursosFisicos = list;
        this.ListRecursosFisicos_aux = list;

        this.localStorage.set('recursos', JSON.stringify(list));
        // console.log(this.ListRecursosFisicos);
      });

      setTimeout(() => {
        this.loader.dismiss();
      }, 2000);
    } else {
      this.loader.dismiss();

      this.localStorage.get('recursos').then((recusos_list) => {
        let list = JSON.parse(recusos_list);
        if (list) {
          this.ListRecursosFisicos = list;
          this.ListRecursosFisicos_aux = list;
        } else {
          this.presentAlert('Ups!', 'Al parecer tienes conexión a Internet.');
        }
      });
    }
  }

  selectMap(item: any) {
    this.navCtrl.push(MapaPage, { unidad: item });
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Actualizando base de datos...',
      dismissOnPageChange: true
    });

    this.loader.present();
  }

  ngOnInit() {

  }

  openDetalle(params) {
    this.navCtrl.push(DetallePage, params);
  }

  presentAlert(title: string, description: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: description,
      buttons: ['OK']
    });
    alert.present();
  }


  /**
   * [initializeItems inicializar los array que son usados para mostrar como listado]
   * @return {[type]} [description]
   */
  initializeItems() {
    this.ListRecursosFisicos = this.ListRecursosFisicos_aux; //Esto es para evitar que los datos originales se eliminen en la busqueda del metodo 'getItems'
  }

  /**
   * [getItems buscar items segun un Nombre, descripcion y Telefono]
   * @param  {[type]} searchbar [description]
   * @return {[type]}           [description]
   */
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (q.trim() === '') {
      return;
    }

    this.ListRecursosFisicos = this.ListRecursosFisicos.filter((v) => {
      if (v.nombrerecurso) {
        if (v.nombrerecurso.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
      } else if (v.numbloque) {
        if ((v.numbloque + '').toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
      } else if (v.descripcion) {
        if ((v.descripcion + '').toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
      }

      return false;
    });
  }

  iconify(tiporecurso) {
    switch (tiporecurso) {
      case 'Recreacion':
        return 'baseball';
      case 'Laboratorio':
        return 'beaker';
      case 'Cafeteria':
        return 'cafe';
      case 'Sala':
        return 'home';
      case 'Parqueadero':
        return 'car';
      case 'Camara':
        return 'camera';
      case 'Papeleria':
        return 'paper';
      case 'Biblioteca':
        return 'book';
      case 'Auditorio':
        return 'mic';
      case 'Entradas':
        return 'arrow-round-down';
      default:
        return 'wine';
    }
  }

}
