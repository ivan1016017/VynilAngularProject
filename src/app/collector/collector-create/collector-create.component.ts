import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollectorService } from '../collector.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CollectorDetail } from '../collectorDetail';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collector-create',
  templateUrl: './collector-create.component.html',
  styleUrls: ['./collector-create.component.css']
})
export class CollectorCreateComponent implements OnInit {
 collectorForm: FormGroup;
 newVariable: Array<CollectorDetail>;

 constructor(

   private toastrService: ToastrService,
   private snackBar: MatSnackBar,
   private collectorService: CollectorService,
   private formBuilder: FormBuilder,
   private router: Router,

   ) {
     this.collectorForm=this.formBuilder.group({
       name: ['', [Validators.required, Validators.minLength(3)]],
       telephone:['',[Validators.required,Validators.minLength(7)]],
       email: ["", [Validators.required, Validators.email]]
      })
    }

    createCollector(collectorC: CollectorDetail) {

      collectorC.name = this.collectorForm.controls.name.value;
      collectorC.telephone = this.collectorForm.controls.telephone.value;
      collectorC.email = this.collectorForm.controls.email.value;

      this.collectorService.createCollectorD(collectorC).subscribe((colletors)=>{
        this.toastrService.success('The collector was created succesfully');
        this.router.navigate(['/dashboard/collectors']);
        this.collectorForm.reset();
      },
      (err)=>{
        this.toastrService.error(err, 'Error');
      });
    }


    cancelCreation(): void {
      this.toastrService.warning('The collector wasn\'t created', 'Author creation');
      this.router.navigate(['/dashboard/collectors']);
      this.collectorForm.reset();
    }

    ngOnInit(): void {
      // this.collectorService.getCollectors().subscribe((colle) => {
      //   this.newVariable = colle;
      // })
  }

}


