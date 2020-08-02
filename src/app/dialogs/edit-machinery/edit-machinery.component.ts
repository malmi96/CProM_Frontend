import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MachineryService } from 'src/app/services/machinery/machinery.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MachineryTypeComponent } from '../machinery-type/machinery-type.component';

@Component({
  selector: 'app-edit-machinery',
  templateUrl: './edit-machinery.component.html',
  styleUrls: ['./edit-machinery.component.css'],
})
export class EditMachineryComponent implements OnInit {
  machinery: any;
  machineryTypes: any;
  updateMachineryForm: FormGroup;
  id: string;
  conditions: string[] = ['New', 'Moderate', 'Critical'];
  constructor(
    private machineryService: MachineryService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditMachineryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.machineryId;
    this.machineryService.getMachineryById(this.id).subscribe((machinery) => {
      this.machinery = machinery;
      this.updateMachineryForm = new FormGroup({
        machineryType: new FormControl(
          this.machinery.machineryType.machineryType
        ),
        machineryName: new FormControl(this.machinery.machineryName),
        machineryCondition: new FormControl(this.machinery.machineryCondition),
        date: new FormControl(this.machinery.date),
      });
    });

    this.machineryService.getMachineryType().subscribe((machineryTypes) => {
      this.machineryTypes = machineryTypes;
    });
  }

  submit(id: string) {
    this.dialogRef.close({
      machineryId: id,
      formValue: this.updateMachineryForm.value,
    });
  }

  onDelete(id: string) {
    this.dialogRef.close({ delete: { machineryId: id } });
  }

  machineryTypeAdd() {
    const dialogRef = this.dialog.open(MachineryTypeComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        return;
      }
      if (data.delete) {
        this.machineryService
          .deleteMachineryType(data.delete.id)
          .subscribe((res) => {
            res = this.machineryService
              .getMachineryType()
              .subscribe((machineryTypes) => {
                this.machineryTypes = machineryTypes;
              });
          });
      }
      if (data.formValue) {
        this.machineryService
          .addMachineryType(data.formValue)
          .subscribe((res) => {
            res = this.machineryService
              .getMachineryType()
              .subscribe((machineryTypes) => {
                this.machineryTypes = machineryTypes;
              });
          });
      }
    });
  }
}
