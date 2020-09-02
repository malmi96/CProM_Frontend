import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InquiryService } from 'src/app/services/inquiry/inquiry.service';

@Component({
  selector: 'app-view-inquiry',
  templateUrl: './view-inquiry.component.html',
  styleUrls: ['./view-inquiry.component.css'],
})
export class ViewInquiryComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[];
  ELEMENT_DATA: any;
  statuses: string[] = ['New', 'Checked'];

  constructor(private inquiryService: InquiryService) {}

  ngOnInit(): void {
    this.inquiryService.getInquiry().subscribe((inquiry) => {
      this.ELEMENT_DATA = inquiry;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.displayedColumns = [
        'customerName',
        'email',
        'contactNo',
        'message',
        'date',
        'status',
        'remove'
      ];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onStatusChange(id: string, value: any){
    console.log(id, value.value);
    this.inquiryService.updateStatus(value.value, id).subscribe((res) => {

      this.inquiryService.getInquiry().subscribe((inquiry) => {
        this.ELEMENT_DATA = inquiry;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.displayedColumns = [
          'customerName',
          'email',
          'contactNo',
          'message',
          'date',
          'status',
          'remove'
        ];
      });
    });
  }

  onDelete(id: string){
    this.inquiryService.removeInquiry(id).subscribe(res => {
      res = alert('Are you sure you want to delete?');
      res = this.inquiryService.getInquiry().subscribe((inquiry) => {
        this.ELEMENT_DATA = inquiry;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.displayedColumns = [
          'customerName',
          'email',
          'contactNo',
          'message',
          'date',
          'status',
          'remove'
        ];
      });
    });
  }
}
