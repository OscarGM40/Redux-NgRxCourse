import { Pipe, PipeTransform } from '@angular/core';
import { filtrosValidos } from '../todos/context/filter.actions';
import { Todo } from '../todos/models/todo.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: Todo[], filtro: filtrosValidos): Todo[] {

    switch (filtro) {
      case 'completados':
        return todos.filter(todo => todo.completado);
      case 'pendientes':
        return todos.filter(todo => !todo.completado);
      default:
        return todos;
    }

  }

}
