import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../contador.actions';
import { ContadorStore } from '../interfaces/contador.interfaces';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: [
  ]
})
export class HijoComponent implements OnInit {

/*   @Input() contador!:number;
  @Output() contadorChange = new EventEmitter<number>(); */
  
  public contador:number = 0;

  constructor( 
    private store: Store<ContadorStore>,
    ) {
      this.store.select('contador').subscribe(contador => this.contador = contador);
     }

  multiplicar(){
  /*   this.contador *= 2;
    this.contadorChange.emit(this.contador); */
    this.store.dispatch( actions.multiplicar({numero:3}) ); 
  }
  
  dividir(){
 /*    this.contador /= 2;
    this.contadorChange.emit(this.contador); */
    this.store.dispatch( actions.dividir({numero:2}) );
  }

  ngOnInit(): void {
  }

}
