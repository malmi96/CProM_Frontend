import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LabourDialogComponent } from 'src/app/dialogs/labour/labour-dialog/labour-dialog.component';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { EditSupplierComponent } from 'src/app/dialogs/edit-supplier/edit-supplier.component';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.css'],
})
export class ViewSupplierComponent implements OnInit {
  supplier = false;
  dataSource: any;
  displayedColumns: string[];
  ELEMENT_DATA: any;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.supplierService.getSupplier().subscribe((suppliers) => {
      this.ELEMENT_DATA = suppliers;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'supplierName',
        'email',
        'address',
        'contactNo',
        'supplyDelay',
        'reorderDelay',
      ];
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onUser(id: string) {
    this.supplier = true;
  }

  openDialog(supplierId: string): void {
    const dialogRef = this.dialog.open(EditSupplierComponent, {
      data: { id: supplierId },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.supplierService
          .deleteSupplier(data.delete.supplierId)
          .subscribe((res) => {
            res = this.supplierService.getSupplier().subscribe((suppliers) => {
              this.ELEMENT_DATA = suppliers;
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
              this.displayedColumns = [
                'supplierName',
                'email',
                'address',
                'contactNo',
                'supplyDelay',
                'reorderDelay',
              ];
            });
          });
      }
      if (data.formValue) {
        console.log(data.formValue);
        this.supplierService
          .updateSupplier(data.supplierId, data.formValue)
          .subscribe((res) => {
            res = this.supplierService.getSupplier().subscribe((suppliers) => {
              this.ELEMENT_DATA = suppliers;
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
              this.displayedColumns = [
                'supplierName',
                'email',
                'address',
                'contactNo',
                'supplyDelay',
                'reorderDelay',
              ];
            });
          });
      }
    });
  }
}
