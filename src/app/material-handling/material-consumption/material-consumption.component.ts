import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-consumption',
  templateUrl: './material-consumption.component.html',
  styleUrls: ['./material-consumption.component.scss'],
})
export class MaterialConsumptionComponent implements OnInit {
  constructor() {}
  projects: string[] = ['Kottawa-site', 'Malabe-site', 'Moratuwa-site'];
  stages: string[] = ['Foundation', 'Brick Work', 'Roofing', 'Painting'];
  materials: string[] = ['Sand', 'Bricks', 'Cement'];
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
  ngOnInit(): void {}
}
