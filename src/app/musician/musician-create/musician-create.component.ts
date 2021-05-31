import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MusicianService } from '../musician.service';
import { ToastrService } from 'ngx-toastr';
import { MusicianDetail } from '../musicianDetail';
import { Musician } from '../musician';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-musician-create',
  templateUrl: './musician-create.component.html',
  styleUrls: ['./musician-create.component.css']
})
export class MusicianCreateComponent implements OnInit {
  musicianForm: FormGroup;
  newVariable: MusicianDetail[]; // new line

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
      private router: Router
    ) {
      this.musicianForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        // image: ['', [Validators.required]],
        birthDate: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(10)]],
      });
    }

    createMusician(musicianC: MusicianDetail) {
      const toDate = this.musicianForm.controls.birthDate.value;
      const dateB: Date = new Date(toDate);
      musicianC.birthDate = dateB;
      musicianC.name = this.musicianForm.controls.name.value;
      musicianC.description = this.musicianForm.controls.description.value;
      musicianC.image = "https://st4.depositphotos.com/17714924/21154/v/450/depositphotos_211543348-stock-illustration-musician-icon-monochrome-style-design.jpg";


      this.musicianService.createmusicianD(musicianC).subscribe(
        (musician) => {
          this.toastrService.success('The musician was created successfully');
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
        this.router.navigate(['/dashboard/musicians']);

        // for (var item of this.newVariable){
        //   console.log(item)
        // }



        this.musicianForm.reset();
      }


  ngOnInit() {
    this.musicianService.getMusicians().subscribe((mus) => {
      this.newVariable = mus;
    })
  }

}
