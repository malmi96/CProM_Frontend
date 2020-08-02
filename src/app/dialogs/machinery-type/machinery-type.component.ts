import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { MachineryService } from 'src/app/services/machinery/machinery.service';

@Component({
  selector: 'app-machinery-type',
  templateUrl: './machinery-type.component.html',
  styleUrls: ['./machinery-type.component.css'],
})
export class MachineryTypeComponent implements OnInit {
  add = false;
  remove = false;
  addForm: FormGroup;
  removeForm: FormGroup;
  types: any;

  constructor(
    private machineryService: MachineryService,
    public dialogRef: MatDialogRef<MachineryTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.machineryService.getMachineryType().subscribe((types) => {
      this.types = types;
    });
    this.addForm = new FormGroup({
      name: new FormControl(''),
    });
    this.removeForm = new FormGroup({
      selectType: new FormControl(''),
    });
  }

  onAdd() {
    this.add = true;
    this.remove = false;
  }

  onRemove() {
    this.remove = true;
    this.add = false;
  }

  addType() {
    const newVal = this.addForm.value.name;
    this.dialogRef.close({ formValue: newVal });
  }

  removeType() {
    const val = this.removeForm.get('selectType').value;
    this.dialogRef.close({ delete: { id: val } });
  }
}
