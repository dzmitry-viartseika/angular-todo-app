import { NgModule } from '@angular/core';
import { TodosComponent } from 'src/app/todos/components/todos/todos.component';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodosService } from './services/todos.service';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  }
]

@NgModule({
  declarations: [
    TodosComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    TodoItemComponent
  ],
  imports: [RouterModule.forChild(routes)],
  providers: [TodosService],
})
export class TodosModule {

}
