import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuarios } from 'src/app/store/actions/usuarios.actions';
import { AppState } from 'src/app/store/app.root-reducer';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios:Usuario[] = [];
  loading = false;
  error:any;
  
  constructor(
    // public usuarioService: UsuarioService,
    private store: Store<AppState>
    ) { }
 
  ngOnInit(): void {
    this.store.select('usuarios')
      .subscribe( ({users,loading,error}) => {
        this.usuarios = [...users];
        this.loading = loading;
        this.error = error; 
      });

    this.store.dispatch(cargarUsuarios());
  /*   this.usuarioService.getUsuarios()
    .subscribe(resp => {
      this.usuarios = resp
    }); */
  }

}
