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

  public changeFilter = (filterName: FilterEnum): void => {
    this.filter$.next(filterName);
  }

  public deleteItem = (itemID: string): void => {
    const updatedTodos = this.todos$.getValue().filter((item: ITodoItem) => item.id !== itemID);
    this.todos$.next(updatedTodos);
  };

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }

      return todo;
    });
    this.todos$.next(updatedTodos);
  }

  toggleTodo = (id: string):void => {
    const updatedTodos = this.todos$.getValue().map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        }
      }
      return item
    })

    this.todos$.next(updatedTodos);
  }
}
