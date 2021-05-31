import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BandService } from '../band.service';
import { ToastrService } from 'ngx-toastr';
import { BandDetail } from '../bandDetail';
import { Band } from '../band';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prize } from 'src/app/prize/prize';
import {PrizeService} from '../../prize/prize.service';

@Component({
  selector: 'app-band-prize',
  templateUrl: './band-prize.component.html',
  styleUrls: ['./band-prize.component.css']
})
export class BandPrizeComponent implements OnInit {

  bandForm: FormGroup;
  newVariable: BandDetail[];
  allBands: Array<Band>;
  bands: Array<Band>;
  allPrizes: Array<Prize>;
  prize: Prize;

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
    private prizeService?: PrizeService
  ) {
    this.bandForm = this.formBuilder.group({
      prize: ["",[Validators.required]],
      band: ["",[Validators.required]],
      premiationDate: ["",[Validators.required]]
    });
  }

  createPrizeToBand(bandC: BandDetail) {
    const toDate = this.bandForm.controls.premiationDate.value;
    const premiationDate: Date = new Date(toDate)
    let tempDateObject = {"premiationDate": premiationDate}
    // musicianC = this.bandForm.controls.band.value;
    // musicianC.bands.push(this.bandForm.controls.musician.value);
    // musicianC.name = "blablabla"
  //  console.log(premiationDate);
  //   console.log(this.bandForm.controls.band.value);
  //   console.log(this.bandForm.controls.band.value.id);

  //   console.log(this.bandForm.controls.prize.value);
  //   console.log(this.bandForm.controls.prize.value.id);

    // console.log(this.bands)
    // console.log(musicianC)
    // console.log(musicianC.id)
    // console.log(this.bandForm.controls.musician.value.id)
    this.bandService.createPrizeToBand(tempDateObject, this.bandForm.controls.prize.value.id, this.bandForm.controls.band.value.id).subscribe(
      (band) => {
        this.toastrService.success('The prize was added to band successfully');
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
  buscarId(pal, list) {
    for (const i of list) {
      if (i.name === pal) {
        return i;
      }
    }
  }

  /**
   * Cancels the creation of the new band
   * Redirects to the band's list page
   */
  cancelCreation(): void {
    this.toastrService.warning("The band wasn't created", 'Band creation');
    // console.log('flag');
    // console.log(this.bandForm.controls.name.value);
    // console.log(this.bandForm.controls.creationDate.value);
    // console.log(this.bandForm.controls.description.value);
    // console.log(this.bandForm.get('name').status);
    // console.log(this.bandForm.get('creationDate').status);
    // console.log(this.bandForm.get('description').status);
    this.router.navigate(['/dashboard/bands']);

    for (var item of this.newVariable) {
      console.log(item);
    }

    this.bandForm.reset();
  }



  getBands(): void{
    this.bandService.getBands().subscribe(bands => {
        this.allBands = bands;
    })
  }

  // addMusician(): void {
  //   const ba = this.bandForm.get('musician').value;
  //   for (const b of this.allBands) {
  //     if (ba === b.name && !this.bands.includes(b)) {
  //       this.bands.push(b);
  //     }
  //   }
  // }



  getPrizes(): void{
    this.prizeService.getPrizes().subscribe(prizes => {
        this.allPrizes = prizes;
    })
  }





  ngOnInit() {
    this.bandService.getBands().subscribe((ban) => {
      this.newVariable = ban;
    });

    this.getBands();
    this.getPrizes();
  }

}
