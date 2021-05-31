import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { AlbumDetail } from '../albumDetail';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-album-listar',
  templateUrl: './album-listar.component.html',
  styleUrls: ['./album-listar.component.css']
})
export class AlbumListarComponent implements OnInit {

  albums: Array<AlbumDetail>;
  selectedAlbum: AlbumDetail;
  selected:boolean=false;
  typecard:string="Album";

  constructor(private albumService: AlbumService) { }


  getAlbums(): void{
    this.albumService.getAlbums().subscribe(albums => {
        this.albums = albums;
      });
  }

  onSelected(a:AlbumDetail):void{
    this.selected=true;
    this.selectedAlbum=a;
  }

  ngOnInit() {
    this.getAlbums()
  }

}
