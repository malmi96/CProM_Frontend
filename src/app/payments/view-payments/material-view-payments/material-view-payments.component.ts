import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialEditPaymentComponent } from 'src/app/dialogs/material-edit-payment/material-edit-payment.component';

@Component({
  selector: 'app-material-view-payments',
  templateUrl: './material-view-payments.component.html',
  styleUrls: ['./material-view-payments.component.css'],
})
export class MaterialViewPaymentsComponent implements OnInit {
  ELEMENT_DATA: any;
  dataSource: any;
  displayedColumns: string[];

  constructor(
    private paymentService: PaymentService,
    private dataPipe: DatePipe,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.paymentService.getMaterialPayments().subscribe((payments) => {
      this.ELEMENT_DATA = payments;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'materialName',
        'supplierName',
        'date',
        'amount',
      ];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(paymentId: string): void {
    const dialogRef = this.dialog.open(MaterialEditPaymentComponent, {
      data: { id: paymentId },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.paymentService
          .deleteMaterialPayments(data.delete.paymentId)
          .subscribe((res) => {
            res = this.paymentService
              .getMaterialPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'materialName',
                  'supplierName',
                  'date',
                  'amount',
                ];
              });
          });
      }
      if (data.formValue) {
        this.paymentService
          .updateMaterialPayment(data.paymentId, data.formValue)
          .subscribe((res) => {
            res = this.paymentService
              .getMaterialPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'materialName',
                  'supplierName',
                  'date',
                  'amount',
                ];
              });
          });
      }
    });
  }
}
