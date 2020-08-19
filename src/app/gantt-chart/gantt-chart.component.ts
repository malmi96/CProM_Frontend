import { Component, OnInit, NgModule } from '@angular/core';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';
import { StageService } from '../services/stage/stage.service';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],
})
export class GanttChartComponent implements OnInit {
  constructor(private stageService: StageService) {}
  public data: Object[];
  stages: any;
  id = 0;
  public taskfield: Object;
  ngOnInit() {
    this.stageService
      .getStagesByForGantt('MountLavinia - site')
      .subscribe((res) => {
        this.stages = res;
        console.log(this.stages);
        this.data = this.stages.map((m, index: number) => ({
          TaskID: index + 1,
          TaskName: m.stage.stageName,
          StartDate: m.stage.stageStartedDate,
          EndDate: m.stage.stageEndingDate,
          subtasks: m.tasks,
        }));
        this.taskfield = {
          id: 'TaskID',
          name: 'TaskName',
          startDate: 'StartDate',
          endDate: 'EndDate',
          duration: 'Duration',
          child: 'subtasks',
        };
      });
  }
}
