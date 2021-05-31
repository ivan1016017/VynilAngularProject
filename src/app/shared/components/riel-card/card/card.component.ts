import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() srcImg:string = "/assets/logoDefaultCard.jpg";
  @Input() nameTitle:string = "Titulo card";
  @Input() typeCard:string = "Tipo card";

  public altCard:string="Portada card";

  constructor() { }

  setAltCard():void{
    this.altCard = `Portada ${this.typeCard}: ${this.nameTitle}`;
  }


  ngOnInit() {
    this.setAltCard()
  }

}
