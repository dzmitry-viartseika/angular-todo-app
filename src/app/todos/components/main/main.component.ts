import {Component} from '@angular/core';
import {combineLatest, map, Observable} from "rxjs";
import {ITodoItem} from "../../types/todo.models";
import {TodosService} from "../../services/todos.service";
import {FilterEnum} from "../../types/FilterEnum";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  visibleTodos$: Observable<ITodoItem[]>;
  noToDoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  constructor(private todosService: TodosService) {
    this.noToDoClass$ = this.todosService.todos$.pipe(map((todos) => todos.length === 0));
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(map((todos) => todos.every((item) => item.isCompleted)));
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$,
    ).pipe(map(([todos, filter]: [ITodoItem[], FilterEnum]) => {
      if (filter === FilterEnum.active) {
        return todos.filter((item) => !item.isCompleted)
      }
      if (filter === FilterEnum.completed) {
        return todos.filter((item) => item.isCompleted)
      }
      return todos;
    }))
  }

  public toggleAllTodos = (event: Event): void =>{
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
}
