import { contadorReducer } from "./contador/contadorReducer";
import { Action, Reducer } from "./ngrx-fake/ngrx";


/* el Store será una clase con un genérico.LLeva dos propiedades privadas autoiniciadas en el constructor y un getter.Recuerda que el store tiene dos objectivos,persistir el state y disparar las acciones */
class Store<T> {
  /* la propiedad state:T siempre será del mismo tipo que la clase Store<T> */
  // OJO: private state:T ya inicia una propiedad cuando se le suministra en el constructor
  constructor( private reducer:Reducer<T>,private state: T){}

  getState():T{
    return this.state;
  }

  /* recuerda que el dispatch es una función que recibe una action por argumento.Despues retornará un newState */
  dispatch(action: Action):void{
    this.state = this.reducer(this.state,action);
  }


} 

export const store = new Store(contadorReducer,10);
/* recuerda que debo acceder por el getter si uso clases */
console.log(store.getState());