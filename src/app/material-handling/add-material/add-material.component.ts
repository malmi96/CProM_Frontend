import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialogs/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { InfoDialogComponent } from 'src/app/dialogs/info/info-dialog/info-dialog.component';
import { Material } from 'src/app/interfaces/material';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public materialService: MaterialService
  ) {}
  material: Material;
  newUnit: string;
  values = '';
  description: string;
  categories: string[] = [
    'Building Materials',
    'Electrical',
    'Roofing',
    'Paint',
    'Plumbing',
    'Other',
  ];
  units: string[] = [
    'packets',
    'cube',
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

  openInfo(): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: 'Material Category Details',
        // tslint:disable-next-line: max-line-length
        info:
          'Materials are mainly categorized into five parts. Building materials are Sand, Soil, Cement, rubbles(metals), Bricks etc.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  submit(addMaterial: NgForm) {
    console.log(addMaterial.value);
    if (addMaterial.value.brand === '' && addMaterial.value.size === '') {
      addMaterial.value.materialName = addMaterial.value.material;
    } else if (addMaterial.value.brand === '') {
      addMaterial.value.materialName =
        addMaterial.value.material + '-' + addMaterial.value.size;
    } else if (addMaterial.value.size === '') {
      addMaterial.value.materialName =
        addMaterial.value.brand + '-' + addMaterial.value.material;
    } else {
      addMaterial.value.materialName =
        addMaterial.value.brand +
        '-' +
        addMaterial.value.material +
        '-' +
        addMaterial.value.size;
    }

    this.materialService.addMaterial(
      addMaterial.value.category,
      addMaterial.value.materialName,
      addMaterial.value.quantity,
      addMaterial.value.unit,
      addMaterial.value.unitCost
    );
  }

  ngOnInit(): void {}
}
