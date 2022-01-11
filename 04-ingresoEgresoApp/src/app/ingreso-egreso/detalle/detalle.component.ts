import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppStateWithIngreso } from 'src/app/ngrx/ingresoEgreso.reducer';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit,OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs!: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ieService:IngresoEgresoService
  ) { }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => this.ingresosEgresos = [...items]);
  }

  borrarItem(uid: string) {
    this.ieService.borrarIngresoEgreso(uid)
    .then( () => Swal.fire('Borrado', 'Item borrado correctamente', 'success'))
    .catch(err => Swal.fire('Error', err.message, 'error'));
  }

}
