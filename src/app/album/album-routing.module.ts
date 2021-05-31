import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumCreateComponent } from './album-create/album-create.component';
import {AlbumTracksComponent} from './album-tracks/album-tracks.component';

const routes: Routes = [
  {
    path: 'albums',
    children: [{ path: 'new', component: AlbumCreateComponent },
  {path: 'album-track', component: AlbumTracksComponent}],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
