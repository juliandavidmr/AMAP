import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as moment from 'moment';
import 'moment/locale/es';

/*
  Generated class for the Date provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DateMethod {

  constructor() {
    moment.locale('es');
  }

  ahora(fecha?): string {
    if (fecha) {
      moment.locale('es');
      return moment(fecha).fromNow();
    } else {
      moment.locale('es');
      return moment(new Date()).fromNow();
    }
  }

}
