import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the Load provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Load {

  public loading: any = {};

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello Load Provider');
  }

  /**
   * Muestra un elemento de carga.
   * @param message mensaje a mostrar
   */
  presentLoadingDefault(message?: string) {
    this.loading = this.loadingCtrl.create({
      content: message ? message : 'Por favor espere...'
    });

    this.loading.present();
  }

  /**
   * Cierra el loading
   */
  closeLoading() {
    this.loading.dismiss();
  }

  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

  presentLoadingText() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });

    loading.present();

    /**
     * Aqui lo que se hará 
    */

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
}