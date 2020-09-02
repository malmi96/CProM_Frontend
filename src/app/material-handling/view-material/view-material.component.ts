import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/material/material.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EditMaterialComponent } from 'src/app/dialogs/edit-material/edit-material.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.scss'],
})
export class ViewMaterialComponent implements OnInit {
  material: any;
  ELEMENT_DATA: any;
  dataSource: any;
  response: any;
  result = false;
  displayedColumns: string[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private materialService: MaterialService,
    private dataPipe: DatePipe,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.materialService.getMaterial().subscribe((material) => {
      this.ELEMENT_DATA = material;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = ['materialName', 'category', 'unit', 'unitCost'];
    });
  }
  materialAdd() {
    this.router.navigate([`/material/add`]);
  }

  onMaterial(id: string): void {
    const dialogRef = this.dialog.open(EditMaterialComponent, {
      data: { materialid: id },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.materialService
          .deleteMaterial(data.delete.materialId)
          .subscribe((res) => {
            this.response = res;
            if (this.response !== null){
              return this.result = true;
            }
            res = this.materialService.getMaterial().subscribe((material) => {
              this.ELEMENT_DATA = material;
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
              this.displayedColumns = [
                'materialName',
                'category',
                'unit',
                'unitCost',
              ];
            });
          });
      }
      if (data.formValue) {
        this.materialService
          .updateMaterial(data.materialId, data.formValue)
          .subscribe((res) => {
            res = this.materialService.getMaterial().subscribe((material) => {
              this.ELEMENT_DATA = material;
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
              this.displayedColumns = [
                'materialName',
                'category',
                'unit',
                'unitCost',
              ];
            });
          });
      }
    });
  }
}
