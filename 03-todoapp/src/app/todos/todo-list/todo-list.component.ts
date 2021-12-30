import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {

  public todos:Todo[] = [];
  
  constructor(private store:Store<AppState>) { 
    this.store.select('todos')
      .subscribe(todos => this.todos = todos);
  }

  ngOnInit(): void {
  }

}
