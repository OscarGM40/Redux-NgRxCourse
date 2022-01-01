import { Action, createReducer, on } from "@ngrx/store";
import { Todo } from "../models/todo.model";

import { borrarTodo, cleanCompleted, crearTodo, editarTodo, toggleAllTodos, toggleTodo } from "./todo.actions";

const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Recolectar la piedra del infinito'),
  new Todo('Matar a Voldemort'),
  new Todo('Vencer a Thanos'),
];

const _todoReducer = createReducer<Todo[],Action>(initialState,
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
  on(editarTodo, (state, { id, texto }) => state.map(todo => 
     todo.id === id ? ({ ...todo, texto }) : todo  )),
  on(borrarTodo, (state, { id }) => state.filter(todo => todo.id !== id)),
  on(toggleAllTodos, (state,{completado}) => state.map(todo => ({ ...todo,completado } ))),
  on(cleanCompleted, (state) => state.filter(todo => !todo.completado))

);

export function todoReducer(state = initialState, action: Action) {
  return _todoReducer(state, action);
}