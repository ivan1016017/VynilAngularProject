import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandCreateComponent } from './band-create/band-create.component';
// import { AlbumListarComponent } from './album-listar/album-listar.component';
import { BandListarComponent } from './band-listar/band-listar.component';
import { BandMusicianComponent } from './band-musician/band-musician.component';
import {BandPrizeComponent} from './band-prize/band-prize.component';
const routes: Routes = [
  {
    path: 'bands',
    children: [
      {
        path: 'new',
        component: BandCreateComponent,
      },
      {
        path: 'band-musician',
        component: BandMusicianComponent,
      },
      {
        path: 'band-prize',
        component: BandPrizeComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BandRoutingModule {}
