import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: [
  ]
})
export class NietoComponent implements OnInit {
  @Input() contador!:number;
  @Output() resetContador = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  reset(): void {
    this.contador = 0;
    this.resetContador.emit(this.contador);
  }
}
