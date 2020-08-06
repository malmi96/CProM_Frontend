import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MachineryEditPaymentComponent } from 'src/app/dialogs/machinery-edit-payment/machinery-edit-payment.component';

@Component({
  selector: 'app-machinery-view-payments',
  templateUrl: './machinery-view-payments.component.html',
  styleUrls: ['./machinery-view-payments.component.css'],
})
export class MachineryViewPaymentsComponent implements OnInit {
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
    this.paymentService.getMachineryPayments().subscribe((payments) => {
      this.ELEMENT_DATA = payments;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'machineryName',
        'supplierName',
        'date',
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
    const dialogRef = this.dialog.open(MachineryEditPaymentComponent, {
      data: { id: paymentId },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.paymentService
          .deleteMachineryPayments(data.delete.paymentId)
          .subscribe((res) => {
            res = this.paymentService
              .getMachineryPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'machineryName',
                  'supplierName',
                  'date',
                  'paymentType',
                  'amount',
                ];
              });
          });
      }
      if (data.formValue) {
        this.paymentService
          .updateMachineryPayment(data.paymentId, data.formValue)
          .subscribe((res) => {
            res = this.paymentService
              .getMachineryPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'machineryName',
                  'supplierName',
                  'date',
                  'paymentType',
                  'amount',
                ];
              });
          });
      }
    });
  }
}
