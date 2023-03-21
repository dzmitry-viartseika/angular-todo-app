import { Component } from '@angular/core';
import {TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public text: string = '';

  constructor(private todoService: TodosService) {
    this.todoService.todos$.subscribe((todos) => {
      console.log('todos', todos)
    })
  }
  changeText = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addNewTodo = (): void => {
    this.todoService.addToDo(this.text);
    console.log('addNewTodo');
    this.text = '';
  }
}
