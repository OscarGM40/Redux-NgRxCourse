import { ActionReducerMap } from '@ngrx/store';
import * as UI from './ngrx/ui.reducer';
import * as Auth from './ngrx/auth.reducer';


export interface AppState {
   ui: UI.InitialState; 
   auth: Auth.authInitialState;
}



export const rootReducer: ActionReducerMap<AppState> = {
   ui: UI.uiReducer,
   auth: Auth.authReducer
}