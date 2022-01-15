import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers/usuarios.reducer';
import * as usuario from './reducers/usuario.reducer';


export interface AppState {
   usuarios: reducers.UsuariosInitialState;
   usuario: usuario.UsuarioInitialState;
}



export const rootReducer: ActionReducerMap<AppState> = {
  usuarios: reducers.UsuariosReducer,
  usuario: usuario.UsuarioReducer
}