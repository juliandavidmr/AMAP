import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuth, AuthProviders, AuthMethods, FirebaseRef, AngularFire, FirebaseListObservable } from 'angularfire2';

import { DetallePage } from "../detalle/detalle";

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
})
export class DashboardPage {

  ListRecursosFisicos: FirebaseListObservable<any>;
  ListRecursosFisicos_aux: FirebaseListObservable<any>;

  constructor(public af: AngularFire, public auth: FirebaseAuth, public navCtrl: NavController) { }

  ngOnInit() {
    this.auth.subscribe((data) => {
      if (data) {

        //console.log(data);
      }
      this.ListRecursosFisicos = this.af.database.list('/recursosfisicos');
      console.log(this.ListRecursosFisicos);
    });
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
