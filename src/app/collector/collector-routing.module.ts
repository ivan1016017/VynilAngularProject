import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectorCreateComponent } from './collector-create/collector-create.component';
import { CollectorListarComponent } from './collector-listar/collector-listar.component';
import {CollectorMusicianComponent} from './collector-musician/collector-musician.component'
import {CollectorBandComponent} from './collector-band/collector-band.component';
import {CollectorAlbumComponent} from './collector-album/collector-album.component';
const routes: Routes=[
  {
    path: 'collectors',
    children: [{
      path: 'new',
      component: CollectorCreateComponent
    },
    {
      path: 'collector-musician',
      component: CollectorMusicianComponent
    },
    {
      path: 'collector-band',
      component: CollectorBandComponent
    },
    {
      path: 'collector-album',
      component: CollectorAlbumComponent
    }]
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectorRoutingModule { }
