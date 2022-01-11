import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppStateWithIngreso } from 'src/app/ngrx/ingresoEgreso.reducer';

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

  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Egesos'];
  
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [ { data: [] }, ]
  };
  
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor( private store: Store<AppStateWithIngreso>,) { }

  ngOnDestroy(): void {
    this.ieSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.ieSubs = this.store.select('ingresosEgresos')
      .subscribe(({ items }) =>
        this.generarEstadistica([...items]));

  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    
    for (let item of items) {
      if (item.tipo === 'ingreso') {
        this.ingresos++;
        this.totalIngresos += item.monto;
      } else {
        this.egresos++;
        this.totalEgresos += item.monto;
      }
    }
    this.doughnutChartData.datasets[0].data = [this.totalIngresos, this.totalEgresos];
  }

}
