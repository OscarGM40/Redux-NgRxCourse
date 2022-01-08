import { newArray } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenarIngresos'
})
export class OrdenarIngresosPipe implements PipeTransform {

  transform( items: IngresoEgreso[]):IngresoEgreso[]  {
    if(items.length > 0){
      return [...items].sort( (a,b) => 
         (a.tipo < b.tipo) ? 1 : 
         (a.tipo > b.tipo) ? -1 : 0);
    }else{
      return items;
    }
  }

}
