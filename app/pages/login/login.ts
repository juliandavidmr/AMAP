import { Component } from '@angular/core';
import { FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  public user: any = { email: '', password: '' };
  loader: any;

  constructor(
    public navCtrl: NavController,
    public auth: FirebaseAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }


  ngOnInit() {
  }

  public registerUser() {
    this.showLoading();

    this.auth.createUser(this.user).then((authdata) => {
      setTimeout(() => {
        this.loader.dismiss();
      });

      let prompt = this.alertCtrl.create({
        title: "Completado",
        subTitle: "Tu cuenta ha sido creada!",
        buttons: ['OK']
      });
      prompt.present();
    }).catch((error) => {
      this.showError(error);
    });
  }

  public login() {
    this.showLoading();

    this.auth.login(this.user, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      this.loader.dismiss();
      this.navCtrl.setRoot(DashboardPage);
    }).catch((error) => {
      this.showError(error);
    })
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Por favor espere..."
    });

    this.loader.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loader.dismiss();
    });

    let prompt = this.alertCtrl.create({
      title: "Falló!",
      subTitle: text,
      buttons: ['OK']
    });

    prompt.present();
  }
}
