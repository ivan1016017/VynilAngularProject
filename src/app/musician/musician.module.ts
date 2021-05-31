import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicianListarComponent } from './musician-listar/musician-listar.component';
import { MusicianDetailComponent } from './musician-detail/musician-detail.component';
import { SharedModule } from '../shared/shared.module';
import { AlbumRoutingModule } from '../album/album-routing.module';
import { MusicianRoutingModule } from '../musician/musician-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatCardModule } from '@angular/material/card';
import { MusicianCreateComponent } from './musician-create/musician-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MusicianPrizeComponent} from './musician-prize/musician-prize.component'

@NgModule({
  imports: [
    CommonModule,
    AlbumRoutingModule,
    SharedModule,
    MusicianRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  declarations: [
    MusicianListarComponent,
    MusicianDetailComponent,
    MusicianCreateComponent,
    MusicianPrizeComponent
  ],
  exports: [
    MusicianListarComponent,
    MusicianCreateComponent,
    MatFormFieldModule,
    MusicianDetailComponent,
    MusicianPrizeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MusicianModule {}
