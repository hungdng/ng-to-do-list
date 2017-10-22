import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../model/task.class';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input('task') task: Task;
  @Output('setStatus') setStatus = new EventEmitter<any>();
  @Output('delete') delete = new EventEmitter<any>();
  @Output('update') update = new EventEmitter<any>();

  public isEditting: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onEditing() {
    this.isEditting = true;
  }

  onStopEditing() {
    this.isEditting = false;
  }
}
