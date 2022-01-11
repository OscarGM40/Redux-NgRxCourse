import { Action,createReducer, on } from '@ngrx/store';
import { AppState } from '../app.rootReducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unSetItems } from './ingresoEgreso.actions';

export interface ingresoEgresoInitialState {
    items: IngresoEgreso[]; 
}

export interface AppStateWithIngreso extends AppState {
    ingresosEgresos: ingresoEgresoInitialState; 
}

export const initialState: ingresoEgresoInitialState = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items } ) => ({ ...state, items: [...items] })),
    on(unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state:ingresoEgresoInitialState = initialState, action:Action) {
    return _ingresoEgresoReducer(state, action);
}