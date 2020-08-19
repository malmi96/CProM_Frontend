import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MaterialService } from 'src/app/services/material/material.service';
import { ReportServiceService } from 'src/app/services/report/report-service.service';
import { EChartOption } from 'echarts';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-supplier-report',
  templateUrl: './supplier-report.component.html',
  styleUrls: ['./supplier-report.component.css'],
})
export class SupplierReportComponent implements OnInit {
  chartOption: EChartOption;
  reportTitle = 'SUPPLIER MATERIAL PRICES REPORT';
  materialName: string;
  date = Date.now();
  data: any;
  materialControl = new FormControl();
  filteredMaterialNames: Observable<string[]>;
  materials: any;
  materialArray: Array<any> = [];
  constructor(
    private materialService: MaterialService,
    private reportService: ReportServiceService
  ) {}

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

  onChange(value: string) {
    this.materialName = value;
    this.reportService.getSupplierPayments(value).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.chartOption = {
        grid: { containLabel: true },
        xAxis: {
          name: 'unitcost(Rs)',
          boundaryGap: true,
        },
        yAxis: {
          type: 'category',
          data: this.data.map((m) => ({
            value: m.supplierName,
          })),
        },
        series: [
          {
            data: this.data.map((m) => ({
              value: m.unitCost,
            })),
            type: 'bar',
            barWidth: '30%',
            barGap: '50%',
          },
        ],
      };
    });
  }
  download() {
    const options = {
      name: 'supplierMaterialPrices-' + this.date,
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { orientation: 'portrait' },
    };
    const element: Element = document.getElementById('report');
    html2pdf().from(element).set(options).save();
  }
}
