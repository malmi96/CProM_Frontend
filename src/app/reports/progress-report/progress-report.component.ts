import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProjectService } from 'src/app/services/project/project.service';
import { ReportServiceService } from 'src/app/services/report/report-service.service';
import { EChartOption } from 'echarts';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.component.html',
  styleUrls: ['./progress-report.component.css']
})
export class ProgressReportComponent implements OnInit {

  chartOption: EChartOption;
  reportTitle = 'PROJECT PROGRESS REPORT';
  projectName: string;
  date = Date.now();
  msg = false;
  data: any;
  projectControl = new FormControl();
  filteredProjectNames: Observable<string[]>;
  projects: any;
  projectArray: Array<any> = [];
  constructor(
    private projectService: ProjectService,
    private reportService: ReportServiceService
  ) {}

  ngOnInit(): void {
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

  onChange(value: string) {
    this.projectName = value;
    this.reportService.getProgress(value).subscribe((res) => {
      this.data = res;
      if (this.data.msg){
        this.msg = true;
      }
      else{
        this.msg = false;
        this.chartOption = {
          grid: { containLabel: true },
          xAxis: {
            name: 'Progress(%)',
            boundaryGap: true,
          },
          yAxis: {
            type: 'category',
            data: this.data.map((m) => ({
              value: m.stageName,
            })),
          },
          series: [
            {
              data: this.data.map((m) => ({
                value: m.progress,
              })),
              type: 'bar',
              barWidth: '30%',
              barGap: '50%',
            },
          ],
        };
      }
    });
  }
  download() {
    const options = {
      name: 'ProjectProgress' + this.date,
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { orientation: 'portrait' },
    };
    const element: Element = document.getElementById('report');
    html2pdf().from(element).set(options).save();
  }
}
