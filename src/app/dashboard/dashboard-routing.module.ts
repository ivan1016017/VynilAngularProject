import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListarComponent} from '../album/album-listar/album-listar.component';
import { DashboardComponent } from './dashboard.component';
import { PrizeListComponent } from '../prize/prize-list/prize-list.component';
import { MusicianListarComponent } from '../musician/musician-listar/musician-listar.component';
import { CollectorListarComponent } from '../collector/collector-listar/collector-listar.component';
import { BandListarComponent } from '../band/band-listar/band-listar.component';

const routes: Routes=[
  { path: '', children: [
    { path: '', component: AlbumListarComponent },
    { path: 'albums', component: AlbumListarComponent },
    { path: 'prizes', component: PrizeListComponent },
    { path: 'collectors', component: CollectorListarComponent},
    { path: 'musicians', component: MusicianListarComponent},
    { path: 'bands', component: BandListarComponent},
  ]},
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
