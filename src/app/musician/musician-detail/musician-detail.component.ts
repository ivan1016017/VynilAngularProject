import { Component, Input, OnInit } from '@angular/core';
import { Musician } from '../musician';
import {MusicianDetail} from '../musicianDetail';


@Component({
  selector: 'app-musician-detail',
  templateUrl: './musician-detail.component.html',
  styleUrls: ['./musician-detail.component.scss']
})
export class MusicianDetailComponent implements OnInit {

  @Input() musicianDetail: MusicianDetail;

  constructor() { }

  ngOnInit() {
    // console.log("flag");
    // console.log(this.musicianDetail);
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
