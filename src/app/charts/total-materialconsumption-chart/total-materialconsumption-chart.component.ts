import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-total-materialconsumption-chart',
  templateUrl: './total-materialconsumption-chart.component.html',
  styleUrls: ['./total-materialconsumption-chart.component.css']
})
export class TotalMaterialconsumptionChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Total Material Consumption (Rs)' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(209, 154, 14)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(
    private materialService: MaterialService
  ) { }

  ngOnInit() {
    this.materialService.getTotMaterialConsumption().subscribe(
      items => {
        items.forEach(li => {
          this.lineChartData[0].data.push(li.consumption);
          this.lineChartLabels.push(li.materialName);
        });
      }
    );
  }

}
