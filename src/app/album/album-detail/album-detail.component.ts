import { BooleanInput } from '@angular/cdk/coercion';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { AlbumDetail } from '../albumDetail';
import { Commenta } from 'src/app/commenta/commenta';


@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  @Input() albumDetail:AlbumDetail;

  constructor( private route: ActivatedRoute,private albumService: AlbumService) {

  }
  comments: Array<Commenta>
  isCollapsed = true;
  albumId: number;

  getAlbumDetail(): void {
    this.albumService.getAlbumDetail(this.albumId)
      .subscribe(albumDetail => {
        this.albumDetail = albumDetail;
      });
  }

  getComments(): void{
    this.albumService.getComments(this.albumId)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  dateFixed(publishingDate: Date): string {
    // console.log(publishingDate);
    // console.log("the date is triggered")
    const dateString: string[] = (publishingDate + '').split('');
    // console.log("FLAG", dateString);
    const dateNoTime: string[] = (publishingDate + '').split('T');
    return (dateNoTime[0]);
  }

  ngOnInit() {
      this.getAlbumDetail();
    // if (this.albumDetail === undefined) {
    //   console.log('routerLink');
    //   this.albumId = +this.route.snapshot.paramMap.get('albumId');
    //   this.getAlbumDetail();

    // } else {
      // console.log('Input');
      // console.log(this.albumDetail.id);
      // console.log(`comments: ${this.albumDetail.comments.length} `);
    // }
    // console.log(this.albumDetail.id)
  }

}
