import { Component, OnInit } from '@angular/core';
import { MachineryService } from 'src/app/services/machinery/machinery.service';
import { MatDialog } from '@angular/material/dialog';
import { MachineryTypeComponent } from 'src/app/dialogs/machinery-type/machinery-type.component';
import { FormGroup, FormControl } from '@angular/forms';
import { InfoDialogComponent } from 'src/app/dialogs/info/info-dialog/info-dialog.component';

@Component({
  selector: 'app-add-machinery',
  templateUrl: './add-machinery.component.html',
  styleUrls: ['./add-machinery.component.scss'],
})
export class AddMachineryComponent implements OnInit {
  machineryTypes: any;
  machineryForm: FormGroup;
  conditions: string[] = ['New', 'Moderate', 'Critical'];
  constructor(
    private machineryService: MachineryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.machineryForm = new FormGroup({
      machineryName: new FormControl(''),
      machineryType: new FormControl(''),
      machineryCondition: new FormControl(''),
      date: new FormControl(''),
    });
    this.machineryService.getMachineryType().subscribe((machineryTypes) => {
      this.machineryTypes = machineryTypes;
    });
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

  submit() {
    this.machineryService
      .addMachinery(
        this.machineryForm.value.machineryName,
        this.machineryForm.value.machineryType,
        this.machineryForm.value.machineryCondition,
        this.machineryForm.value.date
      )
      .subscribe((res) => {
        (res = alert('machinery details added successfully')),
          this.machineryForm.reset();
      });
  }

  openInfo() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: 'Machinery Name',
        // tslint:disable-next-line: max-line-length
        info:
          'You can use any naming method for your ease of reference. Ex: Drilling machine - bought date',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
