import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollectorService } from '../collector.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CollectorDetail } from '../collectorDetail';
import { MatSnackBar } from '@angular/material/snack-bar';
// import {Band} from '../../band/band';
// import {BandService} from '../../band/band.service';
import {Band} from '../../band/band';
import {BandService} from '../../band/band.service';
import {Collector} from '../collector'

@Component({
  selector: 'app-collector-band',
  templateUrl: './collector-band.component.html',
  styleUrls: ['./collector-band.component.css']
})
export class CollectorBandComponent implements OnInit {

  /*
  * Form for collector
  */
  collectorForm: FormGroup;
  newVariable: Array<CollectorDetail>;

  allBands: Array<Band>;
  bands: Array<Band>;
  allCollectors: Array<Collector>;
  collector: Collector;


  constructor(

    private toastrService: ToastrService,
    private snackBar: MatSnackBar,
    private collectorService: CollectorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private bandService?: BandService

    ) {
      this.collectorForm=this.formBuilder.group({
        collector: ["",[Validators.required]],
        band: ["",[Validators.required]]
       })
     }

     /**
      * Creates a new Collector
      */
     createCollectorBandLink(collectorC: CollectorDetail) {

       collectorC = this.collectorForm.controls.collector.value;
       collectorC.favoritePerformers.push(this.collectorForm.controls.band.value);
       collectorC.name = "blablabla"
      //  console.log(this.collectorForm.controls.band.value);
      //  console.log(this.bands)
      //  console.log(collectorC)
      //  console.log(collectorC.id)
      //  console.log(this.collectorForm.controls.band.value.id)

       this.router.navigate(['/dashboard/collectors']);

       this.collectorService.createLinkBandToCollector(collectorC,collectorC.id,this.collectorForm.controls.band.value.id)

       .subscribe(()=>{

         // this.snackBar.open('The collector was created succesfully','',{
           //   duration:5000,
           //   // verticalPosition:'bottom'
           //   verticalPosition:'top'
           // });
         this.toastrService.success("The band was added to the collector's favorite collection");
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

      // for (var item1 of this.allBands){
      //   console.log(item1)
      // }

      // for (var item2 of this.allCollectors){
      //   console.log(item2)
      // }

      // console.log(this.collectorForm.controls.collector.value);


       this.collectorForm.reset();
     }


     getBands(): void{
       this.bandService.getBands().subscribe(bands => {
           this.allBands = bands;
       })
     }

     addBand(): void {
       const coll = this.collectorForm.get('band').value;
       for (const collec of this.allBands) {
         if (coll === collec.name && !this.bands.includes(collec)) {
           this.bands.push(collec);
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

       this.getBands();
       this.getCollectors();

   }


}
