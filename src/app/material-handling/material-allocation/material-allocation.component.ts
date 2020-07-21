import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-allocation',
  templateUrl: './material-allocation.component.html',
  styleUrls: ['./material-allocation.component.scss'],
})
export class MaterialAllocationComponent implements OnInit {
  constructor() {}

  projects: string[] = ['Kottawa-site', 'Kelaniya-site', 'Moratuwa-site'];
  materials: string[] = ['Sand', 'Bricks-9*6*3', 'Insee-Cement-50kg'];
  units: string[] = [
    'Packet',
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

  ngOnInit(): void {}
}
