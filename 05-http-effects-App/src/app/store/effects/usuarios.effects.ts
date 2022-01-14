import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from "../actions/usuarios.actions";



/* Un efecto no es más que una clase con el decorador Injectable,que inyecta el Observable Actions desde la libreria ngrx/effects que hay que instalar */
@Injectable()
export class UsuariosEffects {

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
    ) { }

  /* para crear un efecto se usa el método createEffect(callback:Observable).Sin embargo esto se dispararía en cada accion,asi que se filtran las acciones con el operador ofType */
  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(cargarUsuarios),
      /* mergeMap retorna un nuevo Observable en su callback,fusionando todos los Observable fuente */
      mergeMap(  () => this.usuarioService.getUsuarios()
      .pipe(
        map( users => cargarUsuariosSuccess({usuarios:users}) ),
        catchError( error => of(cargarUsuariosError({payload:error})) )
        ))
      ),
  );

}