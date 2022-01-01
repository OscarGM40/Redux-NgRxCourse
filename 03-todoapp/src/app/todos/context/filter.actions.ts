import { createAction, props } from "@ngrx/store";


/* dado que pasar de tipo string es muy genérico creamos una pequeña enum */
export type filtrosValidos = 'todos' | 'completados' | 'pendientes';


export const setFilter = createAction(
  '[Filter] Set filter',
  props<{ filter: filtrosValidos }>());