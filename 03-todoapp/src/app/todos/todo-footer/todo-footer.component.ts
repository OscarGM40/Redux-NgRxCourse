import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as actions from '../context/filter.actions';
import { cleanCompleted } from '../context/todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html'
})
export class TodoFooterComponent implements OnInit {

  public filtroActual!: actions.filtrosValidos;
  public filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  public tareasPendientes: number = 0;
  public tareasCompletadas: number = 0;


  constructor(private store: Store<AppState>) {
    this.store.subscribe(state => {
      this.filtroActual = state.filtros;
      this.tareasPendientes = state.todos.filter(todo => !todo.completado).length;
      this.tareasCompletadas = state.todos.length - this.tareasPendientes;
    });
  }

  cambiarFiltro(filtro: actions.filtrosValidos) {
    if(filtro === this.filtroActual) {return};
    this.store.dispatch(actions.setFilter({ filter: filtro }));
  }

  limpiarCompletados() {
    if(this.tareasCompletadas === 0) {return};
    this.store.dispatch(cleanCompleted());
  }

  ngOnInit(): void {

    // console.log(this.filtroActual);
  }

}
