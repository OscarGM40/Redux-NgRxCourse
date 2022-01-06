import { Action,createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser,unsetUser } from './auth.actions';

export interface authInitialState {
    user: Usuario | null; 
}

export const initialState: authInitialState = {
   user: null,
}

const _authReducer = createReducer(initialState,

    on(setUser, (state,{user}) => ({ ...state, user: {...user} })),
    on(unsetUser, (state) => ({ ...state, user: null })),

);

export function authReducer(state:authInitialState = initialState, action:Action) {
    return _authReducer(state, action);
}