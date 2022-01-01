import { Action, createReducer, on } from "@ngrx/store";
import { setFilter,filtrosValidos } from "./filter.actions";


const initialState:filtrosValidos = 'todos';


const _filterReducer = createReducer<filtrosValidos,Action>(initialState,
  on(setFilter, (state, { filter }) => filter),
)

export function filterReducer(state=initialState, action:Action) {
  return _filterReducer(state, action);
}