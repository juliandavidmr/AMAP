import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import data from './data.json';
import { Sedes } from '../interfaces/SedeInterface';
import { Recursos } from '../interfaces/RecursoInterface';

@Injectable()
export class ServiceRecursos {

  constructor(public http: Http) {
    console.log('Hello ServiceSalas Provider', data);
  }

  getListRecursos(): Recursos[] {
    return data.recursosfisicos as Recursos[];
  }

  getListSedes(): Sedes[] {
    return data.sedes as Sedes[];
  }

}
