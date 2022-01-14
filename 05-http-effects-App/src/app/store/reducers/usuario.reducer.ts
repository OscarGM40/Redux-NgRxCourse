
import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions/usuario.actions';

export interface UsuarioInitialState {
  id: string | null;
  user: Usuario | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialState: UsuarioInitialState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null
}

const _UsuarioReducer = createReducer(initialState,

  on(cargarUsuario, (state, { id }) => ({
    ...state,
    loading: true,
    id: id
  })),
  on(cargarUsuarioSuccess, (state, { usuario }) =>
  ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...usuario }
  })),
  on(cargarUsuarioError, (state, { payload }) =>
  ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
      status: payload.status
    }
  }))
);

export function UsuarioReducer(state: UsuarioInitialState = initialState, action: Action) {
  return _UsuarioReducer(state, action);
}
