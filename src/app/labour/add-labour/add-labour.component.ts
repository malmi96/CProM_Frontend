import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { LabourService } from 'src/app/services/labour/labour.service';
import { Labour } from 'src/app/interfaces/labour';
import { DataAddDialogComponent } from 'src/app/dialogs/success/data-add-dialog/data-add-dialog.component';

@Component({
  selector: 'app-add-labour',
  templateUrl: './add-labour.component.html',
  styleUrls: ['./add-labour.component.css'],
})
export class AddLabourComponent implements OnInit {
  labourTypes: string[] = ['Mason Bass', 'Electrician', 'Carpenter'];
  labour: Labour;
  result: any;
  constructor(private labourService: LabourService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  submit(addLabour: NgForm) {
    console.log(addLabour.value);
    this.labourService
      .addLabour(
        addLabour.value.labourCategory,
        addLabour.value.labourType,
        addLabour.value.labourName,
        addLabour.value.nic,
        addLabour.value.contactNo,
        addLabour.value.joinedDate,
        addLabour.value.address
      )
      .subscribe((res) => {
        this.result = res;
        setTimeout(() => {
          this.result = false;
        }, 3000);
        addLabour.reset();
      });
  }
}
