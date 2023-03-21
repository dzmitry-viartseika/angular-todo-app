import { Component } from '@angular/core';
import {TodosService} from "../../services/todos.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public noToDoClass$: Observable<boolean>;
  public toDOLength$: Observable<number>;
  constructor(private todosService: TodosService) {
    this.noToDoClass$ = this.todosService.todos$.pipe(map((todos) => todos.length === 0));
    this.toDOLength$ = this.todosService.todos$.pipe(map((todos) => todos.length));
  }
}
