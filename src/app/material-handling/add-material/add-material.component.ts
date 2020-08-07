import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialogs/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { InfoDialogComponent } from 'src/app/dialogs/info/info-dialog/info-dialog.component';
import { Material } from 'src/app/interfaces/material';
import { MaterialService } from 'src/app/services/material/material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public materialService: MaterialService,
    private router: Router
  ) {}
  material: Material;
  result: any;
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
  onKey(value: string) {
    this.values += value + ' | ';
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

    this.materialService
      .addMaterial(
        addMaterial.value.category,
        addMaterial.value.materialName,
        addMaterial.value.unit,
        addMaterial.value.unitCost
      )
      .subscribe((res) => {
        this.result = res;
        setTimeout(() => {
          this.result = false;
        }, 3000);
        addMaterial.resetForm();
      });
  }

  ngOnInit(): void {}
}
