import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.rootReducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  ieSubs!: Subscription;


  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnDestroy(): void {
    this.ieSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.ieSubs = this.store.select('ingresosEgresos')
      .subscribe(({ items }) =>
        this.generarEstadistica([...items]));

  }

  generarEstadistica(items: IngresoEgreso[]) {
    for (let item of items) {
      if (item.tipo === 'ingreso') {
        this.ingresos++;
        this.totalIngresos += item.monto;
      } else {
        this.egresos++;
        this.totalEgresos += item.monto;
      }
    }
  }

}
