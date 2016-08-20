import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FirebaseAuth, AuthProviders, AuthMethods, FirebaseRef, AngularFire, FirebaseListObservable } from 'angularfire2';

import { DetallePage } from "../detalle/detalle";

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
})
export class DashboardPage {

  ListRecursosFisicos: FirebaseListObservable<any>;
  ListRecursosFisicos_aux: FirebaseListObservable<any>;
  loader: any;

  constructor(
    public af: AngularFire,
    public auth: FirebaseAuth,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) {
      this.showLoading();
  }

  onPageDidEnter() {

    this.auth.subscribe((data) => {
      if (data) {

        //console.log(data);
      }
      this.loader.dismiss();
      this.ListRecursosFisicos = this.af.database.list('/recursosfisicos');
      console.log(this.ListRecursosFisicos);
    });
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Por favor espere..."
    });

    this.loader.present();
  }

  ngOnInit() {

  }

  openDetalle(params) {
    this.navCtrl.push(DetallePage, params);
  }

  iconify(tiporecurso) {
    switch (tiporecurso) {
      case "Recreacion":
        return "baseball";
      case "Laboratorio":
        return "beaker";
      case "Cafeteria":
        return "cafe";
      case "Sala":
        return "home";
      case "Parqueadero":
        return "car";
      case "Camara":
        return "camera";
      case "Papeleria":
        return "paper";
      case "Biblioteca":
        return "book";
      case "Auditorio":
        return "mic";
      case "Entradas":
        return "arrow-round-down";
      default:
        return "wine";
    }
  }

}
