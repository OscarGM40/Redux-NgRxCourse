import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, take } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions/usuario.actions';


/* Un efecto no es más que una clase con el decorador Injectable,que inyecta el Observable Actions desde la libreria ngrx/effects que hay que instalar */
@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) { }

  /* para crear un efecto se usa el método createEffect(callback:Observable).Sin embargo esto se dispararía en cada accion,asi que se filtran las acciones con el operador ofType */
  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(cargarUsuario),
      mergeMap(action => this.usuarioService.getUsuarioById(action.id)
        .pipe(
          map(user => cargarUsuarioSuccess({ usuario: user })),
          catchError(error => of(cargarUsuarioError({ payload: error }))),
          take(1)
        ))
    ));

}