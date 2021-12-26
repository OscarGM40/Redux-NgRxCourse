import { decrementadorAction, incrementadorAction, multiplicarAction, dividirAction, resetAction } from './contador/contador.actions';
import { store } from './store';
// import { contadorReducer } from './contador/contadorReducer';

/* Usando el reducer.MAL,pues no se persiste el newState */
/* console.log(contadorReducer(10, incrementadorAction));
console.log(contadorReducer(10,  decrementadorAction));
console.log(contadorReducer(10, multiplicarAction));
console.log(contadorReducer(10, dividirAction));
console.log(contadorReducer(10, resetAction)); */

/* Usando el dispatch del store.BIEN.Cada cambio en el state queda persistido localmente. */
store.dispatch(incrementadorAction);
store.dispatch(incrementadorAction);
console.log(store.getState());
store.dispatch(decrementadorAction);
console.log(store.getState());
store.dispatch(multiplicarAction);
console.log(store.getState());
store.dispatch(dividirAction);
console.log(store.getState());
store.dispatch(resetAction);
console.log(store.getState());