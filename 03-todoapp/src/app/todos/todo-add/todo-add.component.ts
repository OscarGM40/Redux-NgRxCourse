import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as actions from '../context/todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html'
})
export class TodoAddComponent implements OnInit {
  /* la clase FormControl es clave para gestionar inputs sueltos */
  txtInput!: FormControl;

  constructor(private store:Store<AppState>) {
    this.txtInput = new FormControl('Hola', [Validators.required]);
  }

  agregar(){
    if(this.txtInput.invalid){
      return;
    }
    this.store.dispatch(actions.crearTodo({texto: this.txtInput.value})); 
    this.txtInput.setValue('');
  }

  ngOnInit(): void {
  }

}
