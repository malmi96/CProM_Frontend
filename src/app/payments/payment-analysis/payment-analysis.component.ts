import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/services/project/project.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { EChartOption } from 'echarts';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-payment-analysis',
  templateUrl: './payment-analysis.component.html',
  styleUrls: ['./payment-analysis.component.css'],
})
export class PaymentAnalysisComponent implements OnInit {
  chartOption: EChartOption;
  projectControl = new FormControl();
  filteredProjects: Observable<string[]>;
  date: Date;
  expenses: any;
  customer: any;
  project: any;
  projects: Array<any> = [];
  materialTotal: number;
  machineryTotal: number;
  labourTotal: number;
  utilityTotal: number;
  total: number;
  constructor(
    private paymentService: PaymentService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.getProject().subscribe((project) => {
      this.project = project;
      this.project.forEach((response) => {
        this.projects.push(response.projectName);
      });
    });

    this.filteredProjects = this.projectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterProject(value))
    );
  }
  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter((project) =>
      project.toLowerCase().includes(filterValue)
    );
  }

  onSearch(date: Date) {
    this.date = date;
    console.log(this.date);
    this.paymentService.getDailyExpensesForMaterial(date).subscribe((res) => {
      this.materialTotal = res;
      console.log(this.machineryTotal);
    });
    this.paymentService.getDailyExpensesForMachinery(date).subscribe((res) => {
      this.machineryTotal = res;
      console.log(res);
    });
    this.paymentService.getDailyExpensesForLabour(date).subscribe((res) => {
      this.labourTotal = res;
    });
    this.paymentService.getDailyExpensesForUtility(date).subscribe((res) => {
      this.utilityTotal = res;
    });
  }

  onProject(value: string) {
    this.paymentService.getTotalCustomerPayments(value).subscribe((res) => {
      this.customer = res;
    });

    this.paymentService.getProjectExpense(value).subscribe((res) => {
      this.expenses = res;
      this.chartOption = {
        grid: { containLabel: true },
        xAxis: {
          name: 'Amount(Rs.)',
          boundaryGap: true,
        },
        yAxis: {
          type: 'category',
          data: ['Material', 'Utility', 'Labour'],
        },
        series: [
          {
            data: [
              this.expenses.totalMaterialCost,
              this.expenses.totalUtilityCost,
              this.expenses.totalLabourCost,
            ],
            type: 'bar',
            barWidth: '30%',
            barGap: '100%',
          },
        ],
      };
    });
  }
}
