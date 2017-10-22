import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/forms';
import { Task } from '../../model/task.class';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  // public task: Task = null;
  public title: String = '';
  @Output('addTask') addTask = new EventEmitter<String>();
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.addTask.emit(this.title);
    this.title = '';
  }
}
