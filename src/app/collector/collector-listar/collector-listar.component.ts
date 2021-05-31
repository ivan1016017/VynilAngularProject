import { Component, OnInit, Inject } from '@angular/core';
import {Collector} from '../collector';
import { CollectorService } from '../collector.service';
import { CollectorDetail } from '../collectorDetail'
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CollectorCreateComponent } from '../collector-create/collector-create.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { RielCardComponent } from '../../shared/components/riel-card/riel-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collector-listar',
  templateUrl: './collector-listar.component.html',
  styleUrls: ['./collector-listar.component.css']
})
export class CollectorListarComponent implements OnInit {

  collectors: Array<CollectorDetail>;
  selectedCollector: CollectorDetail;
  selected: boolean=false;
  typecard:string="collector";

  constructor(private collectorService: CollectorService,
              public dialog?: MatDialog,
              private router?: Router) { }

  getCollectors(): void {
    this.collectorService.getCollectors().subscribe((collectors) => {
      this.collectors = collectors;
    });
  }

  onSelected(collector : CollectorDetail):void{
    this.selected=true;
    this.selectedCollector= collector;
  }

  onCreate(){
    this.router.navigate(['/dashboard/collectors/new']);
  };

  // onLinkMusicianToCollector(){
  //   // this.dialog.open(CollectorCreateComponent, { disableClose: true });
  //   this.router.navigate(['/dashboard/collectors/collector-musician']);
  // }

  // onLinkBandToCollector(){
  //   // this.dialog.open(CollectorCreateComponent, { disableClose: true });
  //   this.router.navigate(['/dashboard/collectors/collector-band']);
  // }

  // onLinkAlbumToCollector(){
  //   // this.dialog.open(CollectorCreateComponent, { disableClose: true });
  //   this.router.navigate(['/dashboard/collectors/collector-album']);
  // }


  ngOnInit() {
    this.getCollectors();
  }

}

