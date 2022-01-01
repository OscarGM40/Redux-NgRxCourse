import { ActionReducerMap } from "@ngrx/store";
import { filtrosValidos } from "./todos/context/filter.actions";
import { filterReducer } from "./todos/context/filter.reducer";
import { todoReducer } from "./todos/context/todo.reducer";

import { Todo } from "./todos/models/todo.model";


export interface AppState {
  todos: Todo[];
  filtros: filtrosValidos;
}

/* el rootReducer será de tipo ActionReducerMap<T> siendo T mi AppState.Mapeará todos los reducers y los fusionará en uno solo,que debo pasar al app.module en el StoreModule.forRoot(rootReducer) <- aunque también se permite pasar varios alli en un object(StoreModule.forRoot({todos:TodoReducer,filtros:filterReducer})Fijate que es justo el contenido del rootReducer.Crear el rootReducer es opcional,pero altamente recomendable en cuanto tenga más de un reducer*/
export const rootReducer:ActionReducerMap<AppState> = {
  todos: todoReducer,
  filtros: filterReducer,
}
