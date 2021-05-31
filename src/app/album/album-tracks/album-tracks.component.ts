import { Component, Input, OnInit } from '@angular/core';
import { Track} from '../track'
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AlbumService } from '../album.service';
import { ToastrService } from 'ngx-toastr';
import { AlbumDetail } from '../albumDetail';
import { RECORD_LABEL, GENRE } from '../album';
import { Router } from '@angular/router';
import {Album} from '../album';

@Component({
  selector: 'app-album-tracks',
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.css']
})
export class AlbumTracksComponent implements OnInit {
  albumForm: FormGroup;

  records=RECORD_LABEL;
  genres=GENRE;
  recordKeys=[];
  genreKeys=[];

  newVariable: Array<Album>
  allTracks: Array<Track>
  track: Track;
  allAlbums: Array<Album>;
  album: Album;


  // newVariable: Array<AlbumDetail>;


    /**
   * Constructor for the component
   * @param albumService The album's services provider
   * @param formBuilder Builder for the form
   * @param toastrService Toastr to show messages to the user
   * @param router The router
   */


  constructor(
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.albumForm = this.formBuilder.group({
      album: ["",[Validators.required]],
      nameTrack: ["",[Validators.required]],
      durationTrack: ["", [Validators.required]]
    });

    this.recordKeys=Object.keys(this.records);
    this.genreKeys=Object.keys(this.genres);

   }

  createTrackAlbum(albumC: AlbumDetail) {


    // console.log(this.albumForm.controls.idTrack.value);
    // console.log(this.albumForm.controls.nameTrack.value);
    // console.log(this.albumForm.controls.durationTrack.value);


    let object = { "name": this.albumForm.controls.nameTrack.value,
"duration":  this.albumForm.controls.durationTrack.value
}
    albumC = this.albumForm.controls.album.value;

    // console.log(albumC)
    // console.log(albumC.id)


    this.albumService.createLinkTrackToAlbum(object, albumC.id).subscribe(
      (album) => {
        this.toastrService.success('Track added to album successfully');
        this.router.navigate(['/dashboard/albums']);

        this.albumForm.reset();
      },
      (err) => {
        this.toastrService.error(err, 'Error');
      }
    );
  }
    /**
   * Recover the id of an element
   */
     buscarId(pal, list) {
      for (const i of list) {
        if (i.name === pal) {
          return i;
        }
      }
    }

    /**
     * Cancels the creation of the new musicion
     * Redirects to the musician's list page
     */
    cancelCreation(): void {
      this.toastrService.warning('The Track wasn\'t created', 'Album creation');


     for (var item of  this.newVariable){
       console.log(item);
     }





      this.albumForm.reset();
      this.router.navigate(['/dashboard/albums']);
    }





    getAlbums(): void{
      this.albumService.getAlbums().subscribe(albums => {
          this.allAlbums = albums;
      })
    }


ngOnInit() {
 this.albumService.getAlbums().subscribe((al) => {
   this.newVariable = al
 })
 this.getAlbums();
}

}
