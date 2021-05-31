import {PrizeDetail} from '../prize/prizeDetail';

export class MusicianPrize extends PrizeDetail {

  prize: PrizeDetail;
  premiationDate: Date;
  id: number;

  constructor(id?:number, premiationDate?:Date, prize?:PrizeDetail){
    super();
    this.prize = prize;
    this.premiationDate = premiationDate;
    this.id = id;
  }
}


