import { Component, OnInit, NgModule } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';
import { StageService } from '../services/stage/stage.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],
})
export class GanttChartComponent implements OnInit {
  constructor(
    private stageService: StageService,
    private projectService: ProjectService) {}
  public data: Object[];
  result = false;
  stages: any;
  id = 0;
  public taskfield: Object;
  projectControl = new FormControl();
  filteredProjectNames: Observable<string[]>;
  projects: any;
  projectArray: Array<any> = [];
  ngOnInit() {
    this.projectService.getProject().subscribe((projects: any) => {
      this.projects = projects;
      this.projects.forEach((response) => {
        this.projectArray.push(response.projectName);
      });
    });

    this.filteredProjectNames = this.projectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProject(value))
    );
  }
  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projectArray.filter((projectName) =>
      projectName.toLowerCase().includes(filterValue)
    );
  }
  onChange(value: string){
    this.stageService
      .getStagesByForGantt(value)
      .subscribe((res) => {
        this.stages = res;
        console.log(this.stages);
        if (this.stages.msg){
          this.result = true;
          this.data = null;
          setTimeout(() => {
            this.result = false;
          }, 3000);
        }
        else{
          this.result = false;
          this.data = this.stages.map((m, index: number) => ({
            TaskID: index + 1,
            TaskName: m.stage.stageName,
            StartDate: m.stage.stageStartedDate,
            EndDate: m.stage.stageEndingDate,
            subtasks: m.task.map((task, i: number) => ({
              TaskID: task._id,
              TaskName: task.taskName,
              StartDate: task.startDate,
              EndDate: task.endDate
            }))
          }));
          this.taskfield = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            child: 'subtasks',
          };
          console.log(this.data);
        }
      });
  }
}
