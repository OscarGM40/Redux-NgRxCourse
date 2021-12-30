import { createAction, props } from "@ngrx/store";


export const crearTodo = createAction(
  '[TODO] Crea un todo',
  props<{ texto: string }>());

export const toggleTodo = createAction(
  '[TODO] Toggle todo',
  props<{ id: number }>());

export const editarTodo = createAction(
  '[TODO] Editar todo',
  props<{ id: number;texto: string }>());
