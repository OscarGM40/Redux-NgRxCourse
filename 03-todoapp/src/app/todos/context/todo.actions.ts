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

export const borrarTodo = createAction(
  '[TODO] Borrar todo',
  props<{ id: number }>());

export const toggleAllTodos = createAction(
  '[TODO] Toggle all todos',
  props<{ completado: boolean }>());

export const cleanCompleted = createAction(
  '[TODO] Clean completed');
