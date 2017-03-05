import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import data from './data.json';

/*
  Generated class for the ServiceSalas provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
interface Recursos {
  descripcion: string
  nombrerecurso: string
  numbloque: Number
  numpiso: Number
  posicion: { x: Number, y: Number }
  tiporecurso: string
}

@Injectable()
export class ServiceRecursos {

  constructor(public http: Http) {
    console.log('Hello ServiceSalas Provider', data);
  }

  getListRecursos(): Recursos[] {
    return data.recursosfisicos as Recursos[];
  }

}
