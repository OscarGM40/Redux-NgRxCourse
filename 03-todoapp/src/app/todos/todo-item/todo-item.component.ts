import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as actions from '../context/todo.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @ViewChild('inputFisico') inputFisico!: ElementRef;

  checkCompletado!: FormControl;
  txtInput!: FormControl;

  editando = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, [Validators.required]);

    this.checkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(actions.toggleTodo({ id: this.todo.id }));
      // console.log(valor);
    });
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.inputFisico.nativeElement.select(); //focus mete el cursor,select preselecciona todo el texto
    }, 1);
  }

  deleteTodo() {
    this.store.dispatch(actions.borrarTodo({ id: this.todo.id }));
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) {
      return;
    }
    if (this.txtInput.value === this.todo.texto) {
      return;
    }
    this.store.dispatch(actions.editarTodo({
       id: this.todo.id,
       texto: this.txtInput.value 
      }));
  }

}
