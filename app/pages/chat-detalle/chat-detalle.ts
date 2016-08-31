import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as momentjs from 'moment';
import 'moment/locale/es';

@Component({
  templateUrl: 'build/pages/chat-detalle/chat-detalle.html',
})
export class ChatDetallePage {

  detalle: any;
  private moment: any = momentjs;

  constructor(
    private navCtrl: NavController,
    private _navParams: NavParams) {
    this.detalle = this._navParams.data;

    this.moment.locale('es');

    console.log('Detalle chat', this.detalle);
  }

}
