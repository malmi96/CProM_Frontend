import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserService } from 'src/app/services/user/user.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { ReportServiceService } from 'src/app/services/report/report-service.service';

@Component({
  selector: 'app-customer-progress-chart',
  templateUrl: './customer-progress-chart.component.html',
  styleUrls: ['./customer-progress-chart.component.css']
})
export class CustomerProgressChartComponent implements OnInit {

  userId: any;
  project: any;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Stage Name' }
  ];

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private reportService: ReportServiceService
  ) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.projectService
      .getProjectByCustomerId(this.userId)
      .subscribe((project) => {
        this.project = project;
        this.reportService.getProgress(this.project.projectName).subscribe({
          next: items => {
            items.forEach(li => {
              this.barChartData[0].data.push(li.progress);
              this.barChartLabels.push(li.stageName);
            });
          }
        });
      });


  }

}
