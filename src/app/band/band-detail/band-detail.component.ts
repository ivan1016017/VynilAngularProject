import { Component, Input, OnInit } from '@angular/core';
import { Band } from '../band';
import { BandDetail } from '../bandDetail';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.scss']
})
export class BandDetailComponent implements OnInit {

  @Input() bandDetail: BandDetail;

  constructor() { }

  ngOnInit() {
    // console.log(this.bandDetail.name);
  }

  dateFixed(publishingDate: Date): string {
    console.log(publishingDate);
    console.log("the date is triggered")
    const dateString: string[] = (publishingDate + '').split('');
    console.log("FLAG", dateString);
    const dateNoTime: string[] = (publishingDate + '').split('T');
    return (dateNoTime[0]);
  }



}
