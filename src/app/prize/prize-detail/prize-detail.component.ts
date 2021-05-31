import { Component, Input, OnInit } from '@angular/core';
import { PrizeDetail } from '../prizeDetail';
import { PrizeService} from '../prize.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-prize-detail',
  templateUrl: './prize-detail.component.html',
  styleUrls: ['./prize-detail.component.css']
})
export class PrizeDetailComponent implements OnInit {

  @Input() prizeDetail: PrizeDetail;

  ngOnInit() {
  }

}
