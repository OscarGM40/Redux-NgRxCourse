import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { filtrosValidos } from '../context/filter.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {

  public todos:Todo[] = [];
  public filtroActual!:filtrosValidos;

  constructor(private store:Store<AppState>) { 
    this.store.subscribe( ({todos,filtros}) => {
      this.todos = todos;
      this.filtroActual = filtros;
  });
  }

  ngOnInit(): void {
  }

}
