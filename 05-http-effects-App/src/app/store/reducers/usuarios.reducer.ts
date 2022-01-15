








import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from './../actions/usuarios.actions';

export interface UsuariosInitialState {
  users: Usuario[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialState: UsuariosInitialState = {
  users: [],
  loaded: false,
  loading: false,
  error: null
}

const _UsuariosReducer = createReducer(initialState,

  on(cargarUsuarios, state => ({ ...state, loading: true })),
  on(cargarUsuariosSuccess, (state, { usuarios }) =>
  ({
    ...state,
    loading: false,
    loaded: true,
    users: usuarios
  })),
  on(cargarUsuariosError, (state, { payload }) =>
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
  })
  )
);

export function UsuariosReducer(state: UsuariosInitialState = initialState, action: Action) {
  return _UsuariosReducer(state, action);
}