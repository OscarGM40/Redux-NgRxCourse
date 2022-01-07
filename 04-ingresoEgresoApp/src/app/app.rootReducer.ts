import { ActionReducerMap } from '@ngrx/store';
import * as UI from './ngrx/ui.reducer';
import * as Auth from './ngrx/auth.reducer';
import * as IE from './ngrx/ingresoEgreso.reducer';


export interface AppState {
   ui: UI.InitialState; 
   auth: Auth.authInitialState;
   ingresosEgresos: IE.ingresoEgresoInitialState;
}



export const rootReducer: ActionReducerMap<AppState> = {
   ui: UI.uiReducer,
   auth: Auth.authReducer,
   ingresosEgresos: IE.ingresoEgresoReducer
}