

/* con la función createAction obviamente puedo crear acciones */
import { createAction } from "@ngrx/store";

export const incrementar = createAction("[Contador] Incrementar");
export const decrementar = createAction("[Contador] Decrementar");