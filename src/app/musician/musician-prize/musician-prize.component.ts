import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MusicianService } from '../musician.service';
import { ToastrService } from 'ngx-toastr';
import { MusicianDetail } from '../musicianDetail';
import { Musician } from '../musician';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prize } from 'src/app/prize/prize';
import {PrizeService} from '../../prize/prize.service';

@Component({
  selector: 'app-musician-prize',
  templateUrl: './musician-prize.component.html',
  styleUrls: ['./musician-prize.component.css']
})
export class MusicianPrizeComponent implements OnInit {

  musicianForm: FormGroup;
  newVariable: MusicianDetail[]; // new line

  allMusicians: Array<Musician>;
  musicians: Array<Musician>;
  allPrizes: Array<Prize>
  prize: Prize;

    /**
   * Constructor for the component
   * @param musicianService The musician's services provider
   * @param formBuilder Builder for the form
   * @param toastrService Toastr to show messages to the user
   * @param router The router
   */

     constructor(
      private musicianService: MusicianService,
      private formBuilder: FormBuilder,
      private toastrService: ToastrService,
      private router: Router,
      private prizeService?: PrizeService
    ) {
      this.musicianForm = this.formBuilder.group({
        prize: ["",[Validators.required]],
        musician: ["",[Validators.required]],
        premiationDate: ["",[Validators.required]]

      });
    }

    createMusician(musicianC: MusicianDetail) {
      const toDate = this.musicianForm.controls.premiationDate.value;
      const premiationDate: Date = new Date(toDate)
      let tempDateObject = {"premiationDate": premiationDate}
      // musicianC = this.musicianForm.controls.band.value;
      // musicianC.musicians.push(this.musicianForm.controls.musician.value);
      // musicianC.name = "blablabla"
    //  console.log(premiationDate);
    //   console.log(this.musicianForm.controls.musician.value);
    //   console.log(this.musicianForm.controls.musician.value.id);

    //   console.log(this.musicianForm.controls.prize.value);
    //   console.log(this.musicianForm.controls.prize.value.id);

      // console.log(this.musicians)
      // console.log(musicianC)
      // console.log(musicianC.id)
      // console.log(this.musicianForm.controls.musician.value.id)

      this.musicianService.createPrizeToMusician(tempDateObject, this.musicianForm.controls.prize.value.id, this.musicianForm.controls.musician.value.id).subscribe(
        (musician) => {
          this.toastrService.success('The prize was added to musician successfully');
          this.router.navigate(['/dashboard/musicians']);

          this.musicianForm.reset();
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
        this.toastrService.warning('The musician wasn\'t created', 'Musician creation');
        // console.log("flag")
        // console.log(this.musicianForm.controls.name.value)
        // console.log(this.musicianForm.controls.birthDate.value)
        // console.log(this.musicianForm.controls.description.value)
        // console.log(this.musicianForm.get('name').status)
        // console.log(this.musicianForm.get('birthDate').status)
        // console.log(this.musicianForm.get('description').status)
        this.router.navigate(['/dashboard/musicians']);

        for (var item of this.newVariable){
          console.log(item)
        }

        this.musicianForm.reset();
      }

      getMusicians(): void{
        this.musicianService.getMusicians().subscribe(musicians => {
            this.allMusicians = musicians;
        })
      }

      // addMusician(): void {
      //   const mu = this.musicianForm.get('musician').value;
      //   for (const musi of this.allMusicians) {
      //     if (mu === musi.name && !this.musicians.includes(musi)) {
      //       this.musicians.push(musi);
      //     }
      //   }
      // }

      getPrizes(): void{
        this.prizeService.getPrizes().subscribe(prizes => {
            this.allPrizes = prizes;
        })
      }


  ngOnInit() {
    this.musicianService.getMusicians().subscribe((mus) => {
      this.newVariable = mus;
    })

    this.getMusicians();
    this.getPrizes();
  }

}
