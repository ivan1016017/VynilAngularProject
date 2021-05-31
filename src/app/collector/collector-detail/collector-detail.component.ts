import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from 'src/app/album/album.service';
import { AlbumDetail } from 'src/app/album/albumDetail';
import { Collector } from '../collector';
import { CollectorService } from '../collector.service';
import { CollectorDetail } from '../collectorDetail';

@Component({
  selector: 'app-collector-detail',
  templateUrl: './collector-detail.component.html',
  styleUrls: ['./collector-detail.component.css']
})
export class CollectorDetailComponent implements OnInit {
  public albumArray: Array<AlbumDetail>;
  newArray: Array<string>;

  @Input() collectorDetail:CollectorDetail;
  component: Collector;

  constructor (private collectorService: CollectorService,
               private router?: Router) { }

  onLinkMusicianToCollector(){
    // this.dialog.open(CollectorCreateComponent, { disableClose: true });
    this.router.navigate(['/dashboard/collectors/collector-musician']);
  }

  onLinkBandToCollector(){
    // this.dialog.open(CollectorCreateComponent, { disableClose: true });
    this.router.navigate(['/dashboard/collectors/collector-band']);
  }

  onLinkAlbumToCollector(){
    // this.dialog.open(CollectorCreateComponent, { disableClose: true });
    this.router.navigate(['/dashboard/collectors/collector-album']);
  }


  ngOnInit() {
    // this.albumService.getAlbums().subscribe((al) => {
    //   this.albumArray = al;

  }

}
