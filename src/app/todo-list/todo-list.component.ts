import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [NgFor]
})
export class TodoListComponent {
  @Input() list: string[] = [];
  @Input() icon = '';

  @Output() setTaskStatus = new EventEmitter<string>();

  setStat(task: string) {
    this.setTaskStatus.emit(task);
  }
}
