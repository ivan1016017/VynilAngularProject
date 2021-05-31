import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AlbumService } from '../album.service';
import { ToastrService } from 'ngx-toastr';
import { AlbumDetail } from '../albumDetail';
import { RECORD_LABEL, GENRE } from '../album';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {
  albumForm: FormGroup;

  records=RECORD_LABEL;
  genres=GENRE;
  recordKeys=[];
  genreKeys=[];

  newVariable: Array<AlbumDetail>




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
      name: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      recordLabel: ['', [Validators.required]],
    });

    this.recordKeys=Object.keys(this.records);
    this.genreKeys=Object.keys(this.genres);

   }

  createAlbum(albumC: AlbumDetail) {
    const toDate = this.albumForm.controls.releaseDate.value;
    const dateRelease: Date = new Date(toDate);

    albumC.name = this.albumForm.controls.name.value;
    albumC.cover = "https://st.depositphotos.com/1015158/3751/v/950/depositphotos_37517485-stock-illustration-vinyl-record.jpg";
    albumC.releaseDate = dateRelease;
    albumC.description = this.albumForm.controls.description.value;
    albumC.genre = this.albumForm.controls.genre.value;
    albumC.recordLabel = this.albumForm.controls.recordLabel.value;

    this.albumService.createalbumD(albumC).subscribe(
      (album) => {
        this.toastrService.success('Album was created successfully');
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
    //  buscarId(pal, list) {
    //   for (const i of list) {
    //     if (i.name === pal) {
    //       return i;
    //     }
    //   }
    // }

    /**
     * Cancels the creation of the new musicion
     * Redirects to the musician's list page
     */
    cancelCreation(): void {
      this.toastrService.warning('The album wasn\'t created', 'Album creation');


    //  for (var item of  this.newVariable){
    //    console.log(item);
    //  }



      this.albumForm.reset();
      this.router.navigate(['/dashboard/albums']);
    }





ngOnInit() {
 this.albumService.getAlbums().subscribe((al) => {
   this.newVariable = al
 })
}

}

