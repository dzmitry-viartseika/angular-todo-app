import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { ITodoItem } from 'src/app/todos/types/todo.models';
import { FilterEnum } from 'src/app/todos/types/FilterEnum';

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<ITodoItem[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  public addToDo = (text: string): void => {
    const newTodo: ITodoItem = {
      id: Math.random().toString(16),
      isCompleted: false,
      text,
    }

    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  public toggleAll = (isCompleted: boolean): void => {
    const updatedTodos = this.todos$.getValue().map((item) => {
      return {
        ...item,
        isCompleted,
      }
    })

    this.todos$.next(updatedTodos);
  }

  public deleteToDo = (id: string): void => {};



}
