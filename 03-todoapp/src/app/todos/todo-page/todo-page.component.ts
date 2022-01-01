import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as actions from '../context/todo.actions';
@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html'
})
export class TodoPageComponent implements OnInit {

  completado: boolean = false;
  
  constructor(private store: Store<AppState>) { }

  toggleAll(){
    this.completado = !this.completado;
    this.store.dispatch(actions.toggleAllTodos({completado: this.completado}));
  }

  ngOnInit(): void {
  }

}
