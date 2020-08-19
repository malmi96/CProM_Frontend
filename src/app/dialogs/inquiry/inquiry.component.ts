import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { InquiryService } from 'src/app/services/inquiry/inquiry.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css'],
})
export class InquiryComponent implements OnInit {
  inquiryForm: FormGroup;
  wait: any;
  result: any;
  constructor(
    private inquiryService: InquiryService,
    public dialogRef: MatDialogRef<InquiryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.inquiryForm = new FormGroup({
      customerName: new FormControl(''),
      email: new FormControl(''),
      contactNo: new FormControl(''),
      message: new FormControl(''),
    });
  }

  submit() {
    this.dialogRef.disableClose = true;
    this.wait = true;
    this.inquiryService
      .addInquiry(
        this.inquiryForm.value.customerName,
        this.inquiryForm.value.email,
        this.inquiryForm.value.contactNo,
        this.inquiryForm.value.message
      )
      .subscribe((res) => {
        this.result = res;
        setTimeout(() => {
          this.result = false;
        }, 3000);
        this.inquiryForm.reset();
        this.dialogRef.disableClose = false;
      });
  }
}
