import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../services/inquiry/inquiry.service';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css']
})
export class MiniCardComponent implements OnInit {
  inquiries: any;
  constructor(
    private inquiryService: InquiryService
  ) { }

  ngOnInit(): void {
    this.inquiryService.getInquiry().subscribe(res => {
      this.inquiries = res;
    });
  }

}
