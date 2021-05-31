import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListarComponent } from './album-listar/album-listar.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumRoutingModule } from './album-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatCardModule } from '@angular/material/card';
import { AlbumCreateComponent} from './album-create/album-create.component';
import {AlbumTracksComponent} from './album-tracks/album-tracks.component';

@NgModule({
  imports: [
    CommonModule,
    AlbumRoutingModule,
    SharedModule,
    MaterialModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AlbumListarComponent,
    AlbumDetailComponent,
    AlbumCreateComponent,
    AlbumTracksComponent,
  ],
  exports:[AlbumListarComponent, AlbumCreateComponent, AlbumTracksComponent]
})
export class AlbumModule { }
