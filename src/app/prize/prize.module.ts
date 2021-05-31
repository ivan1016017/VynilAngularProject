import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizeListComponent } from './prize-list/prize-list.component';
import { PrizeDetailComponent } from './prize-detail/prize-detail.component';
import { SharedModule } from '../shared/shared.module';
import { PrizeRoutingModule } from '../prize/prize-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatCardModule } from '@angular/material/card';
import { PrizeCreateComponent} from './prize-create/prize-create.component';


@NgModule({
  imports: [
    CommonModule,
    PrizeRoutingModule,
    SharedModule,
    MaterialModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  declarations: [PrizeListComponent, PrizeDetailComponent, PrizeCreateComponent],
  exports: [PrizeListComponent, PrizeCreateComponent]
})
export class PrizeModule { }
