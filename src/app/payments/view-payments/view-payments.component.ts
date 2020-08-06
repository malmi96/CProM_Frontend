import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css'],
})
export class ViewPaymentsComponent implements OnInit {
  customer = false;
  labour = false;
  material = false;
  machinery = false;
  utility = false;

  constructor() {}

  ngOnInit(): void {}

  onCustomer() {
    this.customer = true;
    this.labour = false;
    this.material = false;
    this.machinery = false;
    this.utility = false;
  }

  onLabour() {
    this.labour = true;
    this.material = false;
    this.machinery = false;
    this.utility = false;
    this.customer = false;
  }

  onMaterial() {
    this.material = true;
    this.machinery = false;
    this.utility = false;
    this.customer = false;
    this.labour = false;
  }

  onMachinery() {
    this.machinery = true;
    this.utility = false;
    this.customer = false;
    this.labour = false;
    this.material = false;
  }

  onUtility() {
    this.utility = true;
    this.customer = false;
    this.labour = false;
    this.material = false;
    this.machinery = false;
  }
}
