

/* con la función createAction obviamente puedo crear acciones */
import { createAction, props } from "@ngrx/store";

export const incrementar = createAction("[Contador] Incrementar");
export const decrementar = createAction("[Contador] Decrementar");

/* en cuanto una accion lleve un payload en ngrx se pasa como el argumento props<T>() y se ejecuta la función.No puede tener menos sentido pero oye,asi va esto */
export const multiplicar = createAction(
  "[Contador] Multiplicar",
  props<{ numero: number }>());
export const dividir = createAction(
  "[Contador] Dividir",
  props<{ numero: number }>());

export const resetear = createAction("[Contador] Resetear",props<{valor:number}>());