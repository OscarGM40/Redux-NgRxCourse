
import { createStore, Store} from 'redux';
import { incrementadorAction } from './contador/contador.actions';
import { contadorReducer } from './contador/contadorReducer';

/*Dado que Redux ya ha definido todo no tiene sentido que lo haga yo de nuevo,asi que veamos como se crea el store con redux  */

/* 1- Redux ya tiene una función que crea un Store.Es la función createStore(reducer).No necesito crear la clase yo. Pide un reducer por argumento. */
const store:Store = createStore(contadorReducer);
/* 2- ya puedo hacer el store.dispatch(action) */
store.dispatch(incrementadorAction );
/* 3- y de nuevo ya me proporcionan ellos el getState para acceder a la propiedad privada state*/
console.log(store.getState());

/* 4- Pero lo más genial de todo es que ya nos dan incluso un Observable para suscribirnos.Es la propia ejecución de la función createStore la que es un Observable */

/* no recibe nada en el observer,ya lo manejan ellos.Fijate que esto es genial,pues puedo ser notificado */
store.subscribe( () =>{
  console.log('Nuevo state',store.getState());
});
store.dispatch(incrementadorAction );
store.dispatch(incrementadorAction );
store.dispatch(incrementadorAction );