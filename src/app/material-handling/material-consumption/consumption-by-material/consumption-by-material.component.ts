import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { EChartOption } from 'echarts';
import { type } from 'os';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-consumption-by-material',
  templateUrl: './consumption-by-material.component.html',
  styleUrls: ['./consumption-by-material.component.css'],
})
export class ConsumptionByMaterialComponent implements OnInit {
  chartOption: EChartOption;
  data: any;
  materialControl = new FormControl();
  materials: any;
  materialArray: Array<any> = [];
  filteredMaterialNames: Observable<string[]>;
  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.materialService.getMaterial().subscribe((materials: any) => {
      this.materials = materials;
      this.materials.forEach((response) => {
        this.materialArray.push(response.materialName);
      });
    });

    this.filteredMaterialNames = this.materialControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterMaterial(value))
    );
  }

  private _filterMaterial(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.materialArray.filter((materialName) =>
      materialName.toLowerCase().includes(filterValue)
    );
  }

  onMaterial(value: string) {
    this.materialService
      .getMaterialConsumptionByMaterial(value)
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
              value: m.projectName.projectName,
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
