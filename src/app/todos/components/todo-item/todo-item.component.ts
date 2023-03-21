import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ITodoItem } from '../../types/todo.models';
import {TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input('item') public item!: ITodoItem;
  @Input('isEditing') public isEditing!: boolean;
  @Output('setEditingID') setEditingIDEvent: EventEmitter<string | null> = new EventEmitter();

  public editingText: string = '';
  @ViewChild('editInput') editInput!: ElementRef;

  ngOnInit(): void {
    this.editingText = this.item.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.editInput.nativeElement.focus();
      }, 0)
    }
  }

  constructor(private todoService: TodosService) {}

  deleteItem = (itemID: string): void => {
    this.todoService.deleteItem(itemID);
  }

  setToDoInEditMode = (): void => {
    this.setEditingIDEvent.emit(this.item.id);
  }

  toggleTodo = (): void => {
    console.log('toggleTodo')
    this.todoService.toggleTodo(this.item.id)
  };

  changeText = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo = (): void => {
    this.todoService.changeTodo(this.item.id, this.editingText);
    this.setEditingIDEvent.emit(null);
  }
}
