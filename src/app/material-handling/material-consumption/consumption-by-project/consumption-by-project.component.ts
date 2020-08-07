import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { EChartOption } from 'echarts';
import { type } from 'os';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-consumption-by-project',
  templateUrl: './consumption-by-project.component.html',
  styleUrls: ['./consumption-by-project.component.css'],
})
export class ConsumptionByProjectComponent implements OnInit {
  chartOption: EChartOption;
  data: any;
  projectControl = new FormControl();
  projects: any;
  projectArray: Array<any> = [];
  filteredProjectNames: Observable<string[]>;
  constructor(
    private projectService: ProjectService,
    private materialService: MaterialService
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

  onProject(value: string) {
    this.materialService
      .getMaterialConsumptionByProject(value)
      .subscribe((data) => {
        this.data = data;
        console.log(this.data);
        this.chartOption = {
          grid: { containLabel: true },
          xAxis: {
            boundaryGap: true,
          },
          yAxis: {
            type: 'category',
            data: this.data.map((m) => ({
              value: m.materialName.materialName,
            })),
          },
          series: [
            {
              data: this.data.map((m) => ({
                value: m.quantity,
              })),
              type: 'bar',
              barWidth: '30%',
              barGap: '100%',
            },
          ],
        };
      });
  }
}
