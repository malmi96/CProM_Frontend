import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-project-progress-chart',
  templateUrl: './project-progress-chart.component.html',
  styleUrls: ['./project-progress-chart.component.css']
})
export class ProjectProgressChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Overall Progress %' }
  ];

  constructor(
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectService.getOverallProjectProgress().subscribe({
      next: items => {
        items.forEach(li => {
          this.barChartData[0].data.push(li.progress);
          this.barChartLabels.push(li.projectName);
        });
      }
    });
  }

}
