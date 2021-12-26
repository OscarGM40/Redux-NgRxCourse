import { Action } from "../ngrx-fake/ngrx";

/*es un standar llamar xxx.actions.ext al archivo de las acciones */
export const incrementadorAction: Action = {
  type: 'INCREMENTAR',
};

export const decrementadorAction: Action = {
  type: 'DECREMENTAR',
};

export const multiplicarAction: Action = {
  type: 'MULTIPLICAR',
  payload: 2,
};

export const dividirAction: Action = {
  type: 'DIVIDIR',
  payload: 3,
};

export const resetAction: Action = {
  type: 'RESET',
};
