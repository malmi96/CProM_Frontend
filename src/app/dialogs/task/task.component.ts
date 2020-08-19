import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task/task.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  initialIndex = 0;
  ELEMENT_DATA: any;
  result: any;
  update = false;
  updated: any;
  msg: any;
  task: any;
  dataSource: any;
  displayedColumns: string[];
  statuses: string[] = ['Started', 'Completed'];
  taskForm: FormGroup;
  updateTaskForm: FormGroup;
  info: any;
  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.info = this.data;
    this.taskForm = new FormGroup({
      taskName: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl(''),
    });
    this.taskService.getTasks(this.data.stageid).subscribe((tasks) => {
      this.ELEMENT_DATA = tasks;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = ['taskName', 'startDate', 'endDate', 'status'];
    });
  }

  submit() {
    this.taskService
      .addTask(
        this.data.projectid,
        this.data.stageid,
        this.taskForm.value.taskName,
        this.taskForm.value.startDate,
        this.taskForm.value.endDate,
        this.taskForm.value.status
      )
      .subscribe((res) => {
        this.result = res;
        this.taskForm.reset();
        setTimeout(() => {
          this.result = false;
        }, 3000);

        this.taskService.getTasks(this.data.stageid).subscribe((tasks) => {
          this.ELEMENT_DATA = tasks;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.displayedColumns = [
            'taskName',
            'startDate',
            'endDate',
            'status',
          ];
        });
      });
  }
  onStatusChange(id: string, value: any) {
    console.log(id, value.value);
    this.taskService.updateStatus(id, value.value).subscribe((res) => {
      this.msg = res;
      setTimeout(() => {
        this.msg = false;
      }, 3000);
      this.taskService.getTasks(this.data.stageid).subscribe((tasks) => {
        this.ELEMENT_DATA = tasks;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.displayedColumns = ['taskName', 'startDate', 'endDate', 'status'];
      });
    });
  }

  onUpdate(id: string) {
    this.initialIndex = 2;
    this.update = true;
    this.taskService.getTaskById(id).subscribe((res) => {
      this.task = res;
      this.updateTaskForm = new FormGroup({
        taskName: new FormControl(this.task.taskName),
        startDate: new FormControl(this.task.startDate),
        endDate: new FormControl(this.task.endDate),
        status: new FormControl(this.task.status),
      });
    });
  }
  updateClick(id: string) {
    console.log(
      id,
      this.updateTaskForm.value.taskName,
      this.updateTaskForm.value.startDate,
      this.updateTaskForm.value.endDate,
      this.updateTaskForm.value.status
    );
    this.taskService
      .updateTask(
        id,
        this.updateTaskForm.value.taskName,
        this.updateTaskForm.value.startDate,
        this.updateTaskForm.value.endDate,
        this.updateTaskForm.value.status
      )
      .subscribe((res) => {
        this.updated = res;
        setTimeout(() => {
          this.updated = false;
        }, 3000);
        this.taskService.getTasks(this.data.stageid).subscribe((tasks) => {
          this.ELEMENT_DATA = tasks;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.displayedColumns = [
            'taskName',
            'startDate',
            'endDate',
            'status',
          ];
        });
      });
  }

  delete(id: string) {
    this.taskService.deleteTask(id).subscribe((res) => {
      this.updateTaskForm.reset();
      this.taskService.getTasks(this.data.stageid).subscribe((tasks) => {
        this.ELEMENT_DATA = tasks;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.displayedColumns = ['taskName', 'startDate', 'endDate', 'status'];
      });
      this.initialIndex = 1;
    });
  }
}
