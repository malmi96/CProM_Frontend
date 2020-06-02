import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-machinery',
  templateUrl: './view-machinery.component.html',
  styleUrls: ['./view-machinery.component.scss'],
})
export class ViewMachineryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  editField: string;
  personList: Array<any> = [
    {
      id: 1,
      materialType: 'Sand',
      quantity: 10,
      unit: 'Cubes',
      unitCost: '15 000',
      criticalLevel: '5 Cubes',
    },
    {
      id: 2,
      materialType: 'Bricks',
      quantity: 1000,
      unit: 'units',
      unitCost: '500',
      criticalLevel: '500 units',
    },
    {
      id: 3,
      materialType: 'Cement-50kg',
      quantity: 500,
      unit: 'packets',
      unitCost: '2000',
      criticalLevel: '100 pkts',
    },
  ];

  awaitingPersonList: Array<any> = [
    {
      id: 6,
      name: 'George Vega',
      age: 28,
      companyName: 'Classical',
      country: 'Russia',
      city: 'Moscow',
    },
    {
      id: 7,
      name: 'Mike Low',
      age: 22,
      companyName: 'Lou',
      country: 'USA',
      city: 'Los Angeles',
    },
    {
      id: 8,
      name: 'John Derp',
      age: 36,
      companyName: 'Derping',
      country: 'USA',
      city: 'Chicago',
    },
    {
      id: 9,
      name: 'Anastasia John',
      age: 21,
      companyName: 'Ajo',
      country: 'Brazil',
      city: 'Rio',
    },
    {
      id: 10,
      name: 'John Maklowicz',
      age: 36,
      companyName: 'Mako',
      country: 'Poland',
      city: 'Bialystok',
    },
  ];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}
