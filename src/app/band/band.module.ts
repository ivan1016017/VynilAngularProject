import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandListarComponent } from './band-listar/band-listar.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { AlbumRoutingModule } from '../album/album-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BandRoutingModule } from '../band/band-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BandCreateComponent } from './band-create/band-create.component';
import { MaterialModule } from '../material.module';
import { MatCardModule } from '@angular/material/card';
import { BandMusicianComponent } from './band-musician/band-musician.component';
import { BandPrizeComponent } from './band-prize/band-prize.component';

@NgModule({
  imports: [
    CommonModule,
    AlbumRoutingModule,
    SharedModule,
    BandRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCardModule,
  ],
  declarations: [
    BandListarComponent,
    BandDetailComponent,
    BandCreateComponent,
    BandMusicianComponent,
    BandPrizeComponent,
  ],
  exports: [
    BandListarComponent,
    BandCreateComponent,
    BandMusicianComponent,
    BandPrizeComponent,
  ],
})
export class BandModule {}
