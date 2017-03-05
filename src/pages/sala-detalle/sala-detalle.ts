import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EstacioneDetalle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sala-detalle',
  templateUrl: 'sala-detalle.html'
})
export class SalaDetallePage {

  public detalle: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
     this.detalle = this.navParams.data;    

     console.log(this.detalle); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacioneDetallePage');
  }

}
