import { Action } from "../ngrx-fake/ngrx";

/* recuerda que el reducer es una funcion pura que toma el oldState y una accion y devuelve el newState */
export function contadorReducer(state = 10, action: Action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1;
    case 'DECREMENTAR':
      return state - 1;
    case 'MULTIPLICAR':
      return state * +action.payload;
    case 'DIVIDIR':
      return +(state / +action.payload).toFixed(4);
    case 'RESET':
      return state = 10;
    default:
      return state;
  }
}
