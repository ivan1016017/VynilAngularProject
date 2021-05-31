import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BandService } from '../band.service';
import { ToastrService } from 'ngx-toastr';
import { BandDetail } from '../bandDetail';
import { Band } from '../band';
import { Router } from '@angular/router';

@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrls: ['./band-create.component.scss'],
})
export class BandCreateComponent implements OnInit {
  bandForm: FormGroup;
  newVariable: BandDetail[];

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
    private router: Router
  ) {
    this.bandForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      // image: ['', [Validators.required]],
      creationDate: [''],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  createBand(bandC: BandDetail) {
    const toDate = this.bandForm.controls.creationDate.value;
    const dateB: Date = new Date(toDate);

    bandC.creationDate = dateB;
    bandC.name = this.bandForm.controls.name.value;
    bandC.description = this.bandForm.controls.description.value;
    bandC.image =
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/band-1649484-1399714.png';

    this.bandService.createBandD(bandC).subscribe(
      (band) => {
        this.toastrService.success('The band was created successfully');
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
    this.toastrService.warning("The band wasn't created", 'Band creation');
    this.router.navigate(['/dashboard/bands']);
    this.bandForm.reset();
  }

  ngOnInit() {
    this.bandService.getBands().subscribe((ban) => {
      this.newVariable = ban;
    });
  }
}
