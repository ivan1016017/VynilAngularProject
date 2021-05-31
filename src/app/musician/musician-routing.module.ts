import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MusicianCreateComponent} from './musician-create/musician-create.component';
// import { AlbumListarComponent } from './album-listar/album-listar.component';
import {MusicianListarComponent} from './musician-listar/musician-listar.component';
import {MusicianPrizeComponent} from './musician-prize/musician-prize.component';
const routes: Routes=[
  {
    path: 'musicians',
    children: [{
      path: 'new',
      component: MusicianCreateComponent
    },
    {
      path: 'musician-prize',
      component: MusicianPrizeComponent
    }]
  }
 ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicianRoutingModule { }
