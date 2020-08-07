import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-material-allocation-view',
  templateUrl: './material-allocation-view.component.html',
  styleUrls: ['./material-allocation-view.component.css'],
})
export class MaterialAllocationViewComponent implements OnInit {
  project = false;
  material = false;
  log = false;
  constructor(
    public dialogRef: MatDialogRef<MaterialAllocationViewComponent>,
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
