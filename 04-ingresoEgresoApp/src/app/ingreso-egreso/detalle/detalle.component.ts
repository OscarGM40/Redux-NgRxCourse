import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.rootReducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

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
    private store: Store<AppState>,
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
