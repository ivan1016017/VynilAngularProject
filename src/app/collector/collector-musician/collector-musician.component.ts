import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollectorService } from '../collector.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CollectorDetail } from '../collectorDetail';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Musician} from '../../musician/musician';
import {MusicianService} from '../../musician/musician.service';
import {Collector} from '../collector'


@Component({
  selector: 'app-collector-musician',
  templateUrl: './collector-musician.component.html',
  styleUrls: ['./collector-musician.component.css']
})
export class CollectorMusicianComponent implements OnInit {

  /*
  * Form for collector
  */
 collectorForm: FormGroup;
 newVariable: Array<CollectorDetail>;

 allMusicians: Array<Musician>;
 musicians: Array<Musician>;
 allCollectors: Array<Collector>;
  collector: Collector;


 constructor(

   private toastrService: ToastrService,
   private snackBar: MatSnackBar,
   private collectorService: CollectorService,
   private formBuilder: FormBuilder,
   private router: Router,
   private musicianService?: MusicianService

   ) {
     this.collectorForm=this.formBuilder.group({
       collector: ["",[Validators.required]],
       musician: ["",[Validators.required]]
      })
    }

    /**
     * Creates a new Collector
     */
    createCollectorMusicianLink(collectorC: CollectorDetail) {

      collectorC = this.collectorForm.controls.collector.value;
      collectorC.favoritePerformers.push(this.collectorForm.controls.musician.value);
      collectorC.name = "blablabla"
      // console.log(this.collectorForm.controls.musician.value);
      // console.log(this.musicians)
      // console.log(collectorC)
      // console.log(collectorC.id)
      // console.log(this.collectorForm.controls.musician.value.id)

      this.collectorService.createLinkMusicianToCollector(collectorC,collectorC.id,this.collectorForm.controls.musician.value.id).subscribe((colletors)=>{

        // this.snackBar.open('The collector was created succesfully','',{
          //   duration:5000,
          //   // verticalPosition:'bottom'
          //   verticalPosition:'top'
          // });
        this.toastrService.success("The musician was added to the collector's favorite collection");
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

    //  for (var item of this.newVariable){
    //    console.log(item)
    //  }

    //  for (var item1 of this.allMusicians){
    //    console.log(item1)
    //  }

    //  for (var item2 of this.allCollectors){
    //    console.log(item2)
    //  }

     console.log(this.collectorForm.controls.collector.value);


      this.collectorForm.reset();
    }


    getMusicians(): void{
      this.musicianService.getMusicians().subscribe(musicians => {
          this.allMusicians = musicians;
      })
    }

    addMusician(): void {
      const mu = this.collectorForm.get('musician').value;
      for (const musi of this.allMusicians) {
        if (mu === musi.name && !this.musicians.includes(musi)) {
          this.musicians.push(musi);
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

      this.getMusicians();
      this.getCollectors();

  }





}
