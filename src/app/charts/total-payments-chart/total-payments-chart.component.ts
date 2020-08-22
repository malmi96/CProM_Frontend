import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-total-payments-chart',
  templateUrl: './total-payments-chart.component.html',
  styleUrls: ['./total-payments-chart.component.css']
})
export class TotalPaymentsChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Total Payments (Rs.)' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(76, 178, 76)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit() {

    this.paymentService.getTotalPayments().subscribe(
      items => {
        items.forEach(li => {
          this.lineChartData[0].data.push(li.amount);
          this.lineChartLabels.push(li.paymentType);
        });
      }
    );
  }

}
