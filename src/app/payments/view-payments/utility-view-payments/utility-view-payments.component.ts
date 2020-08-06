import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityEditPaymentComponent } from 'src/app/dialogs/utility-edit-payment/utility-edit-payment.component';

@Component({
  selector: 'app-utility-view-payments',
  templateUrl: './utility-view-payments.component.html',
  styleUrls: ['./utility-view-payments.component.css'],
})
export class UtilityViewPaymentsComponent implements OnInit {
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
    this.paymentService.getUtilityPayments().subscribe((payments) => {
      this.ELEMENT_DATA = payments;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'projectName',
        'stageName',
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
    const dialogRef = this.dialog.open(UtilityEditPaymentComponent, {
      data: { id: paymentId },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.paymentService
          .deleteUtilityPayments(data.delete.paymentId)
          .subscribe((res) => {
            res = this.paymentService
              .getUtilityPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'projectName',
                  'stageName',
                  'paymentDate',
                  'paymentType',
                  'amount',
                ];
              });
          });
      }
      if (data.formValue) {
        this.paymentService
          .updateUtilityPayment(data.paymentId, data.formValue)
          .subscribe((res) => {
            res = this.paymentService
              .getUtilityPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'projectName',
                  'stageName',
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
