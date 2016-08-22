import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseAuth, AuthProviders, AuthMethods, FirebaseRef, AngularFire, FirebaseListObservable } from 'angularfire2';

import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/chat/chat.html',
})
export class ChatPage {

  private autenticado: boolean = false;
  private dataUser: any;
  private messages: FirebaseListObservable<any>;


  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public auth: FirebaseAuth,
    public af: AngularFire) {

    this.auth.subscribe((data) => {
      if (data) {
        this.dataUser = data;
        this.autenticado = true;
        console.log('Autenticado', data);

        this.messages = this.af.database.list('/chat');
        console.log(this.messages);

      } else {
        this.autenticado = false;
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  addMessage() {
    let alert = this.alertCtrl.create({
      title: 'Nuevo mensaje',
      inputs: [
        {
          name: 'message',
          placeholder: 'Mensage'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Añadir',
          handler: data => {
            let newmsg = {
              content: data.message,
              date: new Date().toString(),
              inadecuado: 0,
              user: this.dataUser.auth.email
            };

            this.messages.push(newmsg);

            console.log('Datos ingresados: ', newmsg);

            /*if (User.isValid(data.username, data.password)) {
              // logged in!
            } else {
              // invalid login
              return false;
            }*/
          }
        }
      ]
    });

    alert.present();
  }

}
