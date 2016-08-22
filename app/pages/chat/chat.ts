import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { FirebaseAuth, AngularFire, FirebaseListObservable } from 'angularfire2';

import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/chat/chat.html',
})
export class ChatPage {

  private autenticado: boolean = false;
  private dataUser: any;
  private messages: FirebaseListObservable<any>;
  private loader: any;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public auth: FirebaseAuth,
    private actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    public af: AngularFire) {

    this.messages = this.af.database.list('/chat');
    console.log(this.messages);

    this.auth.subscribe((data) => {
      if (data) {
        this.dataUser = data;
        this.autenticado = true;
        console.log('Autenticado', data);
      } else {
        this.autenticado = false;
      }
    });
  }

  register() {
    let alert = this.alertCtrl.create({
      title: 'No autenticado!',
      subTitle: 'Para enviar un nuevo mensaje debes registrarte.',
      buttons: [
        {
          text: 'Despues',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Registrarme',
          handler: data => {
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  addMessage() {
    if (this.autenticado) {
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
                megusta: 0,
                user: this.dataUser.auth.email
              };

              this.messages.push(newmsg);

              console.log('Datos ingresados: ', newmsg);
            }
          }
        ]
      });
      alert.present();
    } else {
      this.register();
    }
  }

  presentActionSheet(item) {
    let actionSheet = this.actionSheetController.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Inadecuado',
          role: 'destructive',
          handler: () => {
            console.log('Inadecuado clicked');
            this.messages.update(item, { inadecuado: ++item.inadecuado });
          }
        }, {
          text: 'Me gusta',
          role: 'destructive',
          handler: () => {
            console.log('Me gusta clicked');

            this.showLoading('Marcando como me gusta ' + item.content);
            this.messages.update(item, { megusta: ++item.megusta, inadecuado: (item.inadecuado > 0 ? --item.inadecuado : 0) }).then(_ => {
              this.loader.dismiss();
            });
          }
        }, {
          text: 'Ver todo',
          handler: () => {
            console.log('Archive clicked');
            this.presentAlert('Mensaje', item.content);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  presentAlert(title: string, description: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: description,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });

    this.loader.present();
  }

}
