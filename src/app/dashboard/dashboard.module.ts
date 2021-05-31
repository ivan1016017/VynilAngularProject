import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlbumModule} from '../album/album.module';
import { AlbumRoutingModule } from '../album/album-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { CollectorRoutingModule } from '../collector/collector-routing.module';
import { BandModule } from '../band/band.module';
import { MusicianModule } from '../musician/musician.module';
import { CollectorCreateComponent } from '../collector/collector-create/collector-create.component';
import { PrizeModule} from '../prize/prize.module';
import { PrizeRoutingModule} from '../prize/prize-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    SharedModule,
    AlbumRoutingModule,
    CollectorRoutingModule,
    MaterialModule,
    BandModule,
    AlbumModule,
    MusicianModule,
    PrizeModule,
    PrizeRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })

  ],
  declarations: [DashboardComponent],
  entryComponents: [CollectorCreateComponent]
})
export class DashboardModule { }
