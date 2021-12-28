import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrementar, incrementar } from './contador/contador.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contador!:number;

  constructor( private store:Store<{contador:number}>){
    // this.contador = 10;
  
    /* realmente no es lo normal suscribirme a todo el state,sino que 'selecciono' la parte de él que me interesa.Además que de esta forma un cambio en otra zona dispara el Observable y no necesito eso */
  /*   this.store.subscribe( state => {
       console.log(state);
      this.contador = state.contador;
    } ); */

    /* fijate que SÓLO UN CAMBIO EN EL CONTADOR DISPARA ESTE OBSERVABLE.Perfecto  */
    this.store.select('contador').subscribe( contador => this.contador = contador );
  }

  incrementar(){
    // this.contador++;
    this.store.dispatch( incrementar() );
  }

  decrementar(){
    // this.contador--;
    this.store.dispatch(decrementar());
  }

}
