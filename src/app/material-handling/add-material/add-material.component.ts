import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialogs/dialog/dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  newUnit: string;
  values = '';
  categories: string[] = [
    'Building Materials',
    'Electrical',
    'Roofing',
    'Paint',
    'Plumbing',
    'Other',
  ];
  units: string[] = [
    '50kg Pkt',
    'cube(100cuft)',
    '19.2ft',
    '12ft',
    'units',
    'g',
    'kg',
    'cm',
    'm',
    'in',
    'ft',
    'sq cm',
    'sq m',
    'sq in',
    'sq ft',
    'cu cm',
    'cu m',
    'cu in',
    'cu ft',
    'ml',
    'l',
    'other',
  ];
  onKey(value: string) {
    this.values += value + ' | ';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Add new unit',
        inputLabel: 'Enter unit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnInit(): void {}
}
