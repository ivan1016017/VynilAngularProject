import { Component, OnInit } from '@angular/core';
import {Musician} from '../musician';
import {MusicianService} from '../musician.service'
import {MusicianDetail} from '../musicianDetail';

@Component({
  selector: 'app-musician-listar',
  templateUrl: './musician-listar.component.html',
  styleUrls: ['./musician-listar.component.css']
})
export class MusicianListarComponent implements OnInit {

  public musicians: Array<MusicianDetail>;
  selected = false;
  selectedMusician: MusicianDetail;
  typecard:string="musician";

  constructor(private musicianService: MusicianService) { }

  getMusicians(): void {
    this.musicianService.getMusicians().subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  onSelected(musician: MusicianDetail):void{
    this.selected = true;
    this.selectedMusician = musician;
  }

  ngOnInit() {
    this.getMusicians()
  }



}
