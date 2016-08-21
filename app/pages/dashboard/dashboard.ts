import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FirebaseAuth, AngularFire } from 'angularfire2';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';

import { DetallePage } from '../detalle/detalle';

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
})
export class DashboardPage {

  ListRecursosFisicos: any = [];
  ListRecursosFisicos_aux: any = [];
  loader: any;

  constructor(
    public af: AngularFire,
    public auth: FirebaseAuth,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private connectivityService: ConnectivityService,
    private alertCtrl: AlertController
  ) {
    if (this.connectivityService.isOnline()) {
      this.showLoading();
    } else {
      this.presentAlert('Ups!', 'Al parecer tienes conexión a Internet.');
    }
  }

  onPageDidEnter() {
    this.af.database.list('/recursosfisicos', {
      query: {
        limitToLast: 100,
        orderByKey: true
      }
    }).subscribe(list => {
      this.ListRecursosFisicos = list;
      this.ListRecursosFisicos_aux = list;
      // console.log(this.ListRecursosFisicos);
      this.loader.dismiss();
    });
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Actualizando base de datos...'
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
