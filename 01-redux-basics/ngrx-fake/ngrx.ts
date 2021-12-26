/* Recuerda que una acción no es más que un simple plain object con las propiedades type y payload?,siendo el payload opcional.Una interface va de lujo para el contrato */
export interface Action {
  type: string;
  payload?: any;
}

export interface Reducer<T>{
  (state: T, action: Action): T;
}