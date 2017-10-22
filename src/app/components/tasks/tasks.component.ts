import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../model/task.class';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public tasks: Task[] = [];
  public subscription: Subscription;
  public subscriptionParam: Subscription;
  constructor(
    public taskService: TaskService,
    public activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.taskService.getAll().subscribe((tasks: Task[]) => {
      // this.tasks = data;
      this.subscriptionParam = this.activedRoute.params.subscribe((data: Params) => {
         const status = data.complete ? (data.complete === 'true' ? 1 : -1) : 0;
         this.tasks = tasks.filter(task => {
          if (status === 1) {
            return task.complete === true;
          } else if (status === -1) {
            return task.complete === false;
          }else {
            return task;
          }
         });
       });
    });
  }

  addTask(title: string) {
    const task = new Task(title);
    this.subscription = this.taskService.add(task).subscribe((data: Task) => {
      this.tasks.push(data);
    });
  }

  setStatus(task) {
    task.complete = !task.complete;
    this.subscription = this.taskService.update(task).subscribe((data: Task) => {
      this.updateData(data);
    });
  }

  onDelete(id: number) {
    this.subscription = this.taskService.delete(id).subscribe((data: Task) => {
      this.updateDataAfterDelete(id);
    });
  }

  onUpdate(task: Task) {
    this.subscription = this.taskService.update(task).subscribe((data: Task) => {
      this.updateData(data);
    });
  }

  updateData(data) {
    // this.tasks.forEach(task => {
    //   if (task.id === data.id) {
    //     task = data;
    //   }
    // });

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === data.id ) {
        this.tasks[i] = data;
        break;
      }
    }
  }

  updateDataAfterDelete(id: number) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id ) {
        this.tasks.splice(i, 1);
        break;
      }
    }
  }


}
