import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MaterialService } from 'src/app/services/material/material.service';
import { Material } from 'src/app/interfaces/material';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css'],
})
export class EditMaterialComponent implements OnInit {
  id: string;
  changeName = false;
  materialElement: any;
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
  constructor(
    public dialog: MatDialog,
    public materialService: MaterialService,
    public dialogRef: MatDialogRef<EditMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.materialid;
    this.materialService
      .getMaterialById(this.id)
      .subscribe((material: Material) => {
        this.materialElement = material;
      });
  }

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
  }

  onChange() {
    if (this.changeName === false) {
      this.changeName = true;
    } else {
      this.changeName = false;
    }
  }

  onUpdate(id: string, updateMaterial: NgForm) {
    console.log(updateMaterial);
    if (this.changeName === true) {
      if (
        updateMaterial.value.brand === '' &&
        updateMaterial.value.size === ''
      ) {
        updateMaterial.value.materialName = updateMaterial.value.material;
      } else if (updateMaterial.value.brand === '') {
        updateMaterial.value.materialName =
          updateMaterial.value.material + '-' + updateMaterial.value.size;
      } else if (updateMaterial.value.size === '') {
        updateMaterial.value.materialName =
          updateMaterial.value.brand + '-' + updateMaterial.value.material;
      } else {
        updateMaterial.value.materialName =
          updateMaterial.value.brand +
          '-' +
          updateMaterial.value.material +
          '-' +
          updateMaterial.value.size;
      }
      this.dialogRef.close({
        materialId: id,
        formValue: updateMaterial.value,
      });
    } else {
      this.dialogRef.close({
        materialId: id,
        formValue: updateMaterial.value,
      });
    }
  }

  onDelete(id: string) {
    this.dialogRef.close({ delete: { materialId: id } });
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
  }
}
