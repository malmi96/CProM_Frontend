import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { InfoDialogComponent } from 'src/app/dialogs/info/info-dialog/info-dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { Customer } from 'src/app/interfaces/user';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  values = '';
  customerControl = new FormControl();
  customer: any;
  resultArray: Array<any> = [];
  statuses: string[] = [
    'Started',
    'Ongoing',
    'Temporary Stopped',
    'Stopped',
    'Finished',
  ];
  filteredCustomerNames: Observable<string[]>;
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.addProjectForm = new FormGroup({
      customerName: this.customerControl,
      city: new FormControl(''),
      projectName: new FormControl(''),
      projectLocation: new FormControl(''),
      startingDate: new FormControl(''),
      endingDate: new FormControl(''),
      status: new FormControl(''),
    });

    this.userService.getCustomer().subscribe((customer: any) => {
      this.customer = customer;
      this.customer.forEach((response) => {
        this.resultArray.push(response.customerName);
      });
    });

    this.filteredCustomerNames = this.customerControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCustomer(value))
    );
  }
  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.resultArray.filter((customerName) =>
      customerName.toLowerCase().includes(filterValue)
    );
  }

  onKey(value: string) {
    this.values += value + ' | ';
  }

  openInfo(): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: 'Project Name',
        // tslint:disable-next-line: max-line-length
        info:
          'Project Name is declared as a combination of nearest city name and the word site. If there are more than one project in the same city, use the starting date without punctuation marks at the end of the name. Ex:- Malabe-site-20200305',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  submit() {
    this.addProjectForm.value.projectName =
      this.addProjectForm.value.city + ' - site';
    console.log(this.addProjectForm.value);
    this.projectService.addProject(
      this.addProjectForm.value.projectName,
      this.addProjectForm.value.projectLocation,
      this.addProjectForm.value.customerName,
      this.addProjectForm.value.startingDate,
      this.addProjectForm.value.endingDate,
      this.addProjectForm.value.status
    );
  }

  onReset() {
    this.addProjectForm.reset();
  }
}
