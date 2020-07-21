import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabourService } from 'src/app/services/labour/labour.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-labour-dialog',
  templateUrl: './labour-dialog.component.html',
  styleUrls: ['./labour-dialog.component.css'],
})
export class LabourDialogComponent implements OnInit {
  labourEditForm: FormGroup;
  labourTypes: string[] = ['Mason Bass', 'Electrician', 'Carpenter'];
  labour: any;
  id: string;
  constructor(
    private labourService: LabourService,
    public dialogRef: MatDialogRef<LabourDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data.id);
    this.id = this.data.id;
    this.labourService.getLabourById(this.id).subscribe((labour) => {
      this.labour = labour;
      this.labourEditForm = new FormGroup({
        labourCategory: new FormControl(this.labour.labourCategory),
        labourType: new FormControl(this.labour.labourType),
        labourName: new FormControl(this.labour.labourName),
        labourNIC: new FormControl(this.labour.labourNIC),
        labourContactNo: new FormControl(this.labour.labourContactNo),
        joinedDate: new FormControl(this.labour.joinedDate),
        labourAddress: new FormControl(this.labour.labourAddress),
      });
    });
  }
  onDelete(id: string) {
    this.dialogRef.close({ delete: { labourId: id } });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  submit(id: string) {
    this.dialogRef.close({
      labourId: id,
      formValue: this.labourEditForm.value,
    });
  }
}
