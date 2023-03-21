import { Component } from '@angular/core';
import {TodosService} from "../../services/todos.service";
import {map, Observable} from "rxjs";
import {FilterEnum} from "../../types/FilterEnum";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public noToDoClass$: Observable<boolean>;
  public itemsLeftText$: Observable<string>;
  public activeCount$: Observable<number>;
  public filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;
  constructor(private todosService: TodosService) {
    this.noToDoClass$ = this.todosService.todos$.pipe(map((todos) => todos.length === 0));
    this.activeCount$ = this.todosService.todos$.pipe(map((todos) => todos.filter((item) => !item.isCompleted).length));
    this.itemsLeftText$ = this.activeCount$.pipe(map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`));
    this.filter$ = this.todosService.filter$
  }

  changeFilter = (event: Event, filterName: FilterEnum): void => {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }
}
