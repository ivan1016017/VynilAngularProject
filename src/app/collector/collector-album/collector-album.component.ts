import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollectorService } from '../collector.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CollectorDetail } from '../collectorDetail';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Collector} from '../collector'
import {Album} from '../../album/album'
import {AlbumService} from '../../album/album.service'


@Component({
  selector: 'app-collector-album',
  templateUrl: './collector-album.component.html',
  styleUrls: ['./collector-album.component.css']
})
export class CollectorAlbumComponent implements OnInit {



  /*
  * Form for collector
  */
  collectorForm: FormGroup;
  newVariable: Array<CollectorDetail>;

  allAlbums: Array<Album>;
  albums: Array<Album>;
  allCollectors: Array<Collector>;
  collector: Collector;
  allStatus: Array<string> = ["Active", "Inactive" ];


  constructor(

    private toastrService: ToastrService,
    private snackBar: MatSnackBar,
    private collectorService: CollectorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private albumService?: AlbumService

    ) {
      this.collectorForm=this.formBuilder.group({
        collector: ["",[Validators.required]],
        album: ["",[Validators.required]],
        price: ["", [Validators.required]],
        status: ["",[Validators.required]]
       })
     }

     /**
      * Creates a new Collector
      */
     createCollectorBandLink(collectorC: CollectorDetail) {

       collectorC = this.collectorForm.controls.collector.value;
        // console.log(collectorC)
        // console.log(this.collectorForm.controls.album.value.id)
        // console.log(collectorC.id)
        // console.log(this.collectorForm.controls.status.value)

       let tempPriceAlbumObject = {"price": parseInt(this.collectorForm.controls.price.value), "status":this.collectorForm.controls.status.value}

       this.router.navigate(['/dashboard/collectors']);

       this.collectorService.createLinkAlbumToCollector(tempPriceAlbumObject,collectorC.id,parseInt(this.collectorForm.controls.album.value.id))

       .subscribe((colletors)=>{

         // this.snackBar.open('The collector was created succesfully','',{
           //   duration:5000,
           //   // verticalPosition:'bottom'
           //   verticalPosition:'top'
           // });
         this.toastrService.success("The album was added to the collector's favorite collection");
         this.router.navigate(['/dashboard/collectors']);
         this.collectorForm.reset();
       },
       (err)=>{
         // this.snackBar.open(err+"Error",'Close',{
         //   duration:5000,
         // });
         this.toastrService.error(err, 'Error');
       });
     }

     /**
      * Cancels the creation of the new collector
      * Redirects to the collector list page
      */
     cancelCreation(): void {

       // this.snackBar.open('The collector wasn\'t created','',{
         //   duration:5000,
         //   // verticalPosition:'bottom'
         //   verticalPosition:'top'
         // });
       this.toastrService.warning("The musician couldn't be added to the collector's favorite collection", 'Musician link to collector');
       this.router.navigate(['/dashboard/collectors']);

       // this.router.navigate(['./dashboard']);
       //   this.toastrService.warning('The collector wasn\'t created', 'Author creation');
       // this.snackBar.open('The collector wasn\'t created','',{
       //  duration:5000,
         // verticalPosition:'bottom'
       //  verticalPosition:'top'
   //    });

      // for (var item of this.newVariable){
      //   console.log(item)
      // }

      // for (var item1 of this.allAlbums){
      //   console.log(item1)
      // }

      // for (var item2 of this.allCollectors){
      //   console.log(item2)
      // }

      // console.log(this.collectorForm.controls.collector.value);


       this.collectorForm.reset();
     }


     getAlbums(): void{
       this.albumService.getAlbums().subscribe(albums => {
           this.allAlbums = albums;
       })
     }

     addBand(): void {
       const coll = this.collectorForm.get('album').value;
       for (const collec of this.allAlbums) {
         if (coll === collec.name && !this.albums.includes(collec)) {
           this.albums.push(collec);
         }
       }
     }



     getCollectors(): void{
       this.collectorService.getCollectors().subscribe(collectors => {
           this.allCollectors = collectors;
       })
     }



     ngOnInit(): void {
       this.collectorService.getCollectors().subscribe((colle) => {
         this.newVariable = colle;
       })

       this.getAlbums();
       this.getCollectors();

   }


}
