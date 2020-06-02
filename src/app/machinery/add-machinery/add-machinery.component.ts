import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-machinery',
  templateUrl: './add-machinery.component.html',
  styleUrls: ['./add-machinery.component.scss'],
})
export class AddMachineryComponent implements OnInit {
  machineries: string[] = ['backo', 'caterpillar'];
  constructor() {}

  ngOnInit(): void {}
}
