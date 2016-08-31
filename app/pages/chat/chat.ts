import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ActionSheetController, LoadingController, ToastController, Content } from 'ionic-angular';
import { FirebaseAuth, AngularFire, FirebaseListObservable } from 'angularfire2';
import * as momentjs from 'moment';
import 'moment/locale/es';
import 'rxjs/add/operator/map';

import { LoginPage } from '../login/login';
import { ChatDetallePage } from '../chat-detalle/chat-detalle';

@Component({
  templateUrl: 'build/pages/chat/chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;

  private autenticado: boolean = false;
  private dataUser: any;
  private messages: FirebaseListObservable<any>;
  private loader: any;
  private moment: any = momentjs;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public auth: FirebaseAuth,
    private actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    public af: AngularFire) {
    this.moment.locale('es');

    // console.log('=>', this.moment().format(new Date().toDateString()));
  }

  ionViewLoaded() {
    this.messages = this.af.database.list('/chat');

    /* this.messages.do(snapshots => {
      snapshots.forEach(snapshot => console.log(snapshot));
    })
    .subscribe(snapshots => console.log(snapshots.length));
    */

    this.auth.subscribe((data) => {
      if (data) {
        this.dataUser = data;
        this.autenticado = true;
        console.log('Autenticado', data);
      } else {
        this.autenticado = false;
      }
    });

    // this.content.scrollToBottom(300); // 300ms animation speed
    this.content.scrollTo(0, 500, 200);
    /*let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.scrollBottom, 0);*/
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
                inadecuado: {
                  count: 0,
                  users: []
                },
                megusta: {
                  count: 0,
                  users: []
                },
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

  openDetalle(item: any) {
    this.navCtrl.push(ChatDetallePage, item);
  }

    /**
  * Verifica si un mensaje ya ha sido marcado por un usuario (el logueado actualmente)
  */
  hasEmail(users: any, email: string) {
    return new Promise((resolve, reject) => {
      console.log('Item=>', users);

      if (users) {
        users.forEach(element => {
          if (element.user === email) {
            console.log('====Comparing: ', element.user, this.dataUser.auth.email);
            return reject(true);
          }
        });
      }
      return resolve(false);
    });
  }

  meGusta(item: any) {
    console.log('Me gusta clicked');

    this.hasEmail(item.megusta.users, this.dataUser.auth.email).then(() => {
      this.showLoading('Marcando como me gusta ' + item.content);

      this.messages.update(item, {
        megusta: {
          count: ++item.megusta.count,
          users: (() => {
            if (item.megusta.users) {
              item.megusta.users.push({
                user: this.dataUser.auth.email,
                date: new Date()
              });
              return item.megusta.users;
            } else {
              return [{
                user: this.dataUser.auth.email,
                date: new Date()
              }];
            }
          })()
        }
      }).then(_ => {
        this.loader.dismiss();
      });
    }).catch(_ => {
      this.presentToast('Ya me gusta este mensaje.', 3000);
    });
  }

  inadecuado(item: any) {
    console.log('Inadecuado clicked');

    this.hasEmail(item.inadecuado.users, this.dataUser.auth.email).then(() => {
      this.messages.update(item, {
        inadecuado: {
          count: ++item.inadecuado.count,
          users: (() => {
            if (item.inadecuado.users) {
              item.inadecuado.users.push({
                user: this.dataUser.auth.email,
                date: new Date()
              });
              return item.inadecuado.users;
            } else {
              return [{
                user: this.dataUser.auth.email,
                date: new Date()
              }];
            }
          })()
        }
      });
    }).catch(_ => {
      this.presentToast('Ya lo has marcado como inadecuado.', 3000);
    });
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

  presentToast(msg: string, time: number) {
    let toast = this.toastController.create({
      message: msg,
      duration: time
    });
    toast.present();
  }

}
