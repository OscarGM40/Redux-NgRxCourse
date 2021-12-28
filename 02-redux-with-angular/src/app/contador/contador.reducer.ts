

import { Action, createReducer, on } from "@ngrx/store";
import { decrementar, dividir, incrementar, multiplicar, resetear } from "./contador.actions";

/* forma vanilla TS,pero ngrx proporciona una función más eficiente.Se llama createReducer */
/* export function contadorReducer(
  state:number=10,
  action:Action
  ){
  switch(action.type){
    case incrementar.type:
      return state+1;
    case decrementar.type:
      return state-1;
    default:
      return state;
  }
} */

/* FORMA CON NGRX Y CREATEREDUCER */
export const initialState = 10;
/* la función 'on' permite seleccionar más rápidamente la acción que en el switch  */
const _contadorReducer = createReducer(
  initialState,
  on(incrementar, (state) => state + 1),
  on(decrementar, (state) => state - 1),
  on(multiplicar, (state, { numero }) => state * numero),
  on(dividir, (state, {numero}) => state / numero),
  on(resetear, (state, {valor}) => valor)
  )

/* ojo que usar la forma anterior implica tener que realizar este paso,pues es el retorno de la función anterior lo que se exporta al store */
export function contadorReducer(state:number=initialState, action: Action) {
  return _contadorReducer(state, action);
}
/* esto asegura la no-mutación */
