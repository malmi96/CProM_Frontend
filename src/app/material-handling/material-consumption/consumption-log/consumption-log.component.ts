import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-consumption-log',
  templateUrl: './consumption-log.component.html',
  styleUrls: ['./consumption-log.component.css'],
})
export class ConsumptionLogComponent implements OnInit {
  material: any;
  ELEMENT_DATA: any;
  dataSource: any;
  displayedColumns: string[];

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.materialService.getMaterialConsumptionLog().subscribe((material) => {
      this.ELEMENT_DATA = material;
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'projectName',
        'stageName',
        'materialName',
        'quantity',
        'unit',
        'date',
      ];
    });
  }

  onDelete(id: string) {
    this.materialService.removeLog(id).subscribe((res) => {
      res = this.materialService
        .getMaterialAllocationLog()
        .subscribe((material) => {
          this.ELEMENT_DATA = material;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.displayedColumns = [
            'projectName',
            'materialName',
            'quantity',
            'unit',
            'date',
          ];
        });
    });
  }
}
