import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-material-consumption-view',
  templateUrl: './material-consumption-view.component.html',
  styleUrls: ['./material-consumption-view.component.css'],
})
export class MaterialConsumptionViewComponent implements OnInit {
  project = false;
  material = false;
  log = false;
  constructor(
    public dialogRef: MatDialogRef<MaterialConsumptionViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  onProject(): void {
    this.material = false;
    this.log = false;
    this.project = true;
  }

  onMaterial() {
    this.log = false;
    this.project = false;
    this.material = true;
  }
  onLog() {
    this.project = false;
    this.material = false;
    this.log = true;
  }
}
