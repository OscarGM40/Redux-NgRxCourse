import { ActionReducerMap } from '@ngrx/store';
import * as UI from './ngrx/ui.reducer';


export interface AppState {
   ui: UI.InitialState; 
}



export const rootReducer: ActionReducerMap<AppState> = {
   ui: UI.uiReducer,
}