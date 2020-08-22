import { Component, OnInit } from '@angular/core';
import { LabourService } from '../services/labour/labour.service';

@Component({
  selector: 'app-mini-card-labours',
  templateUrl: './mini-card-labours.component.html',
  styleUrls: ['./mini-card-labours.component.css']
})
export class MiniCardLaboursComponent implements OnInit {

  labours: any;
  constructor(
    private labourService: LabourService
  ) { }

  ngOnInit(): void {
    this.labourService.getLabour().subscribe(res => {
      this.labours = res;
    });
  }

}
