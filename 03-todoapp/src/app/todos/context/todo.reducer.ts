import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { Todo } from "../models/todo.model";

import { crearTodo, editarTodo, toggleTodo } from "./todo.actions";



const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Recolectar la piedra del infinito'),
  new Todo('Matar a Voldemort'),
  new Todo('Vencer a Thanos'),
];

const _todoReducer = createReducer(initialState,
  on(crearTodo, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggleTodo, (state, { id }) => state.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        completado: !todo.completado
      }
    }
    return todo;
  })),
  on(editarTodo, (state, { id, texto }) => state.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        texto:texto
      }
    }
    return todo;
  })),

);

export function todoReducer(state = initialState, action: Action) {
  return _todoReducer(state, action);
}