import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BandService } from '../band.service';
import { ToastrService } from 'ngx-toastr';
import { BandDetail } from '../bandDetail';
import { Band } from '../band';
import { Router } from '@angular/router';
import {Musician} from '../../musician/musician';
import {MusicianService} from '../../musician/musician.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-band-musician',
  templateUrl: './band-musician.component.html',
  styleUrls: ['./band-musician.component.css']
})
export class BandMusicianComponent implements OnInit {

  bandForm: FormGroup;
  newVariable: BandDetail[];
  allMusicians: Array<Musician>;
  musicians: Array<Musician>;
  allBands: Array<Band>;
  band: Band;


  /**
   * Constructor for the component
   * @param bandService The bond's services provider
   * @param formBuilder Builder for the form
   * @param toastrService Toastr to show messages to the user
   * @param router The router
   */

  constructor(
    private bandService: BandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private musicianService?: MusicianService
  ) {
    this.bandForm = this.formBuilder.group({
      band: ["",[Validators.required]],
      musician: ["",[Validators.required]]
    });
  }

  createMusicianBandLink(bandC: BandDetail) {
    bandC = this.bandForm.controls.band.value;
    // bandC.musicians.push(this.bandForm.controls.musician.value);
    bandC.name = "blablabla"
    // console.log(this.bandForm.controls.musician.value);
    // console.log(this.musicians)
    // console.log(bandC)
    // console.log(bandC.id)
    // console.log(this.bandForm.controls.musician.value.id)

    // this.router.navigate(['/dashboard/bands']);


    this.bandService.createLinkMusicianToBand(bandC, bandC.id,this.bandForm.controls.musician.value.id).subscribe(
      (band) => {
        this.toastrService.success('The musician was successfully added to the band');
        this.router.navigate(['/dashboard/bands']);

        this.bandForm.reset();
      },
      (err) => {
        this.toastrService.error(err, 'Error');
      }
    );
  }
  /**
   * Recover the id of an element
   */
  // buscarId(pal, list) {
  //   for (const i of list) {
  //     if (i.name === pal) {
  //       return i;
  //     }
  //   }
  // }

  /**
   * Cancels the creation of the new band
   * Redirects to the band's list page
   */
  cancelCreation(): void {
    this.toastrService.warning("The musicians wasn't added to the band", 'Musician link to band');
    // console.log('flag');
    // console.log(this.bandForm.controls.name.value);
    // console.log(this.bandForm.controls.creationDate.value);
    // console.log(this.bandForm.controls.description.value);
    // console.log(this.bandForm.get('name').status);
    // console.log(this.bandForm.get('creationDate').status);
    // console.log(this.bandForm.get('description').status);
    this.router.navigate(['/dashboard/bands']);

    // for (var item of this.newVariable) {
    //   console.log(item);
    // }



    // for (var item1 of this.allMusicians){
    //   console.log(item1)
    // }

    // for (var item2 of this.allBands){
    //   console.log(item2)
    // }

    // console.log(this.bandForm.controls.band.value);

    this.bandForm.reset();
  }




  getMusicians(): void{
    this.musicianService.getMusicians().subscribe(musicians => {
        this.allMusicians = musicians;
    })
  }

  addMusician(): void {
    const mu = this.bandForm.get('musician').value;
    for (const musi of this.allMusicians) {
      if (mu === musi.name && !this.musicians.includes(musi)) {
        this.musicians.push(musi);
      }
    }
  }



  getBands(): void{
    this.bandService.getBands().subscribe(bands => {
        this.allBands = bands;
    })
  }

  ngOnInit() {
    this.bandService.getBands().subscribe((ban) => {
      this.newVariable = ban;
    });
    this.getMusicians();
    this.getBands();

  }

}
