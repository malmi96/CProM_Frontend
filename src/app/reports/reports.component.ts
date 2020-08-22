import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  supplier = false;
  progress = false;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  onSupplier(){
    this.progress = false;
    this.supplier = true;
  }
  onProgress(){
    this.supplier = false;
    this.progress = true;
  }

}
