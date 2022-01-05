import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface InitialState {
    isLoading: Boolean; 
}

export const initialState: InitialState = {
   isLoading: false,
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: true })),
    on(stopLoading, state => ({ ...state, isLoading: false })),

);

export function uiReducer(state = initialState, action:Action) {
    return _uiReducer(state, action);
}