import { createAction, props } from "@ngrx/store";


export const crearTodo = createAction(
  '[TODO] Crea un todo',
  props<{ texto: string }>());