import { Component, OnInit } from '@angular/core';
import {Band} from '../band';
import {BandService} from '../band.service';
import {BandDetail} from '../bandDetail';

@Component({
  selector: 'app-band-listar',
  templateUrl: './band-listar.component.html',
  styleUrls: ['./band-listar.component.scss']
})
export class BandListarComponent implements OnInit {

  public bands: Array<BandDetail>;
  selected = false;
  selectedBand: BandDetail;
  typecard:string="Band";

  constructor(private bandService: BandService) { }

  getBands(): void{
    this.bandService.getBands().subscribe((bands)=> {
      this.bands = bands;
    })
  }

  onSelected(band: BandDetail):void{
    this.selected = true;
    this.selectedBand= band;
  }


  ngOnInit() {
    this.getBands();
  }

}
