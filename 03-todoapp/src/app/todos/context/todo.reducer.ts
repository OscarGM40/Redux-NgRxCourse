import { Action, createReducer, on } from "@ngrx/store";
import { Todo } from "../models/todo.model";

import { crearTodo } from "./todo.actions";



const initialState:Todo[]= [
  new Todo('Salvar al mundo'),
];

const _todoReducer = createReducer(initialState,
  on(crearTodo,(state,{texto}) => [...state,new Todo(texto)]),

  );

export function todoReducer(state=initialState,action:Action){
  return _todoReducer(state,action);
}