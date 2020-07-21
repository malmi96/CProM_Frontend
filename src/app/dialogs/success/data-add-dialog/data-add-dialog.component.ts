import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-data-add-dialog',
  templateUrl: './data-add-dialog.component.html',
  styleUrls: ['./data-add-dialog.component.css'],
})
export class DataAddDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DataAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onOkay(): void {
    this.dialogRef.close();
  }
}
