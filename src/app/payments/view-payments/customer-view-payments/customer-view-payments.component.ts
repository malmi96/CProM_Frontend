import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/material/material.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EditMaterialComponent } from 'src/app/dialogs/edit-material/edit-material.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { CustomerEditPaymentComponent } from 'src/app/dialogs/customer-edit-payment/customer-edit-payment.component';

@Component({
  selector: 'app-customer-view-payments',
  templateUrl: './customer-view-payments.component.html',
  styleUrls: ['./customer-view-payments.component.css'],
})
export class CustomerViewPaymentsComponent implements OnInit {
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
    this.paymentService.getCustomerPayments().subscribe((payments) => {
      this.ELEMENT_DATA = payments;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'projectName',
        'customerName',
        'paymentDate',
        'paymentType',
        'amount',
      ];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(paymentId: string): void {
    const dialogRef = this.dialog.open(CustomerEditPaymentComponent, {
      data: { id: paymentId },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.paymentService
          .deleteCustomerPayment(data.delete.paymentId)
          .subscribe((res) => {
            res = this.paymentService
              .getCustomerPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'projectName',
                  'customerName',
                  'paymentDate',
                  'paymentType',
                  'amount',
                ];
              });
          });
      }
      if (data.formValue) {
        console.log(data.formValue);
        this.paymentService
          .updateCustomerPayment(data.paymentId, data.formValue)
          .subscribe((res) => {
            res = this.paymentService
              .getCustomerPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'projectName',
                  'customerName',
                  'paymentDate',
                  'paymentType',
                  'amount',
                ];
              });
          });
      }
    });
  }
}
