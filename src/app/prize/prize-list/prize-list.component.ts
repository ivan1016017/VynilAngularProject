import { Component, OnInit } from '@angular/core';
import { Prize } from '../prize';
import { PrizeService } from '../prize.service';
import { PrizeDetail} from '../prizeDetail'

@Component({
  selector: 'app-prize-list',
  templateUrl: './prize-list.component.html',
  styleUrls: ['./prize-list.component.css'],
})
export class PrizeListComponent implements OnInit {

  public prizes: Array<PrizeDetail>;
  typecard:string="prize";
  selectedPrize: PrizeDetail;
  selected:boolean=false;
  img:string="https://cdn.icon-icons.com/icons2/1194/PNG/512/1490886316-39-trophy_82485.png";



  constructor(private prizeService: PrizeService) {}

  getPrizes(): void {
    this.prizeService.getPrizes().subscribe((prizes) => {
      this.prizes = prizes;
    });
  }

  onSelected(prize: PrizeDetail):void{
    this.selected=true;
    this.selectedPrize= prize;
  }

  ngOnInit() {
    this.getPrizes();
  }
}
