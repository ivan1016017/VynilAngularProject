import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { PrizeService } from '../prize.service';
import { ToastrService } from 'ngx-toastr';
import { PrizeDetail } from '../prizeDetail';
import { Prize } from '../prize';
import { Router } from '@angular/router';




@Component({
  selector: 'app-prize-create',
  templateUrl: './prize-create.component.html',
  styleUrls: ['./prize-create.component.css']
})
export class PrizeCreateComponent implements OnInit {
  prizeForm: FormGroup;

  newVariable: PrizeDetail[];

    /**
   * Constructor for the component
   * @param prizeService The prize's services provider
   * @param formBuilder Builder for the form
   * @param toastrService Toastr to show messages to the user
   * @param router The router
   */

     constructor(
      private prizeService: PrizeService,
      private formBuilder: FormBuilder,
      private toastrService: ToastrService,
      private router: Router
    ) {
      this.prizeForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        organization: ['', [Validators.required]],
      });
    }

    createPrize(prizeC: PrizeDetail) {
      prizeC.name = this.prizeForm.controls.name.value;
      prizeC.description = this.prizeForm.controls.description.value;
      prizeC.organization = this.prizeForm.controls.organization.value;


      this.prizeService.createprizeD(prizeC).subscribe(
        (prize) => {
          this.toastrService.success('Prize created successfully');
          this.router.navigate(['/dashboard/prizes']);

          this.prizeForm.reset();
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
       * Cancels the creation of the new prize
       * Redirects to the prizes list page
       */
      cancelCreation(): void {
        this.toastrService.warning('Prize was not created', 'Prize created');
        // console.log("flag")
        // console.log(this.prizeForm.controls.name.value)
        // console.log(this.prizeForm.controls.description.value)
        // console.log(this.prizeForm.controls.organization.value)
        // console.log(this.prizeForm.get('name').status)
        // console.log(this.prizeForm.get('description').status)
        // console.log(this.prizeForm.get('organization').status)


        // for (var item of this.newVariable) {
        //   console.log(item);
        // }

        this.prizeForm.reset();
        this.router.navigate(['/dashboard/prizes']);
      }


  ngOnInit() {

    this.prizeService.getPrizes().subscribe((pri) => {
      this.newVariable = pri;
    });
  }

}
