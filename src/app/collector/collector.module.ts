import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorListarComponent } from './collector-listar/collector-listar.component'
import { CollectorDetailComponent } from './collector-detail/collector-detail.component'
import { SharedModule } from '../shared/shared.module';
import { CollectorRoutingModule } from '../collector/collector-routing.module';
import { MaterialModule } from '../material.module';
import { MatCardModule } from '@angular/material/card';
import { CollectorCreateComponent } from './collector-create/collector-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CollectorMusicianComponent} from './collector-musician/collector-musician.component'
import {CollectorBandComponent} from './collector-band/collector-band.component';
import {CollectorAlbumComponent} from './collector-album/collector-album.component'
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  imports: [
    CommonModule,
    CollectorRoutingModule,
    SharedModule,
    MaterialModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CollectorListarComponent,
    CollectorDetailComponent,
    CollectorCreateComponent,
    CollectorMusicianComponent,
    CollectorBandComponent,
    CollectorAlbumComponent
    ],
  exports: [
    CollectorListarComponent,
    CollectorCreateComponent,
    CollectorMusicianComponent,
    CollectorBandComponent,
    CollectorAlbumComponent
  ],

})
export class CollectorModule { }
