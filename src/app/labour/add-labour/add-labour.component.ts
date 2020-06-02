import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-labour',
  templateUrl: './add-labour.component.html',
  styleUrls: ['./add-labour.component.css'],
})
export class AddLabourComponent implements OnInit {
  labourTypes: string[] = ['Mason Bass', 'Electrician', 'Carpenter'];
  constructor() {}

  ngOnInit(): void {}
}
