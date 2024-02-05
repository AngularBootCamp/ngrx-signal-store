import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { HomeTaskStore } from '../../home-tasks.state';
import { TodoListComponent } from '../../todo-list/todo-list.component';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  standalone: true,
  imports: [TodoListComponent, AsyncPipe]
})
export class HomeTaskListComponent {
  private readonly store = inject(HomeTaskStore);
  done = this.store.doneHome;
  todo = this.store.todoHome;

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  homeTask(task: string, complete: boolean) {
    this.store.setHomeState(task, complete);
  }
}
