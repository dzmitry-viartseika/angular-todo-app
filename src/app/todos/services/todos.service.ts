import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { ITodoItem } from 'src/app/todos/types/todo.models';

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<ITodoItem[]>([]);

  public addToDo = (text: string): void => {
    const newTodo: ITodoItem = {
      id: Math.random().toString(16),
      isCompleted: false,
      text,
    }

    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }
}
