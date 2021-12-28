import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContadorStore } from '../interfaces/contador.interfaces';
import * as actions from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: [
  ]
})
export class NietoComponent implements OnInit {
/*   @Input() contador!:number;
  @Output() resetContador = new EventEmitter(); */
  public contador!:number;

  constructor(private store: Store<ContadorStore>,) {
    this.store.select('contador').subscribe(contador => this.contador = contador);

   }

  ngOnInit(): void {
  }

  reset(): void {
/*     this.contador = 0;
    this.resetContador.emit(this.contador); */
    this.store.dispatch( actions.resetear({valor:0}) );
  }
}
