import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LabourEditPaymentComponent } from 'src/app/dialogs/labour-edit-payment/labour-edit-payment.component';

@Component({
  selector: 'app-labour-view-payments',
  templateUrl: './labour-view-payments.component.html',
  styleUrls: ['./labour-view-payments.component.css'],
})
export class LabourViewPaymentsComponent implements OnInit {
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
    this.paymentService.getLabourPayments().subscribe((payments) => {
      this.ELEMENT_DATA = payments;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'labour',
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
    const dialogRef = this.dialog.open(LabourEditPaymentComponent, {
      data: { id: paymentId },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.paymentService
          .deleteLabourPayments(data.delete.paymentId)
          .subscribe((res) => {
            res = this.paymentService
              .getLabourPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'labour',
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
          .updateLabourWages(data.paymentId, data.formValue)
          .subscribe((res) => {
            res = this.paymentService
              .getLabourPayments()
              .subscribe((payments) => {
                this.ELEMENT_DATA = payments;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.displayedColumns = [
                  'labour',
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
