import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: [
  ]
})
export class HijoComponent implements OnInit {

  @Input() contador!:number;
  @Output() contadorChange = new EventEmitter<number>();

  constructor() { }

  multiplicar(){
    this.contador *= 2;
    this.contadorChange.emit(this.contador);
  }
  
  dividir(){
    this.contador /= 2;
    this.contadorChange.emit(this.contador);
  }

  contadorReset(value: number){
    this.contador = value;
    this.contadorChange.emit(this.contador);
  }

  ngOnInit(): void {
  }

}
