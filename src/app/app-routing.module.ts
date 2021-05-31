import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PrizeListComponent } from './prize/prize-list/prize-list.component';
import { AlbumListarComponent } from './album/album-listar/album-listar.component';
import { CollectorListarComponent } from './collector/collector-listar/collector-listar.component'
import { MusicianListarComponent } from './musician/musician-listar/musician-listar.component'
import { MainComponent } from './main/main.component';
import { BandListarComponent } from './band/band-listar/band-listar.component';
import { AlbumModule } from './album/album.module';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  {path:'dashboard',component: DashboardComponent,
  loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
  // {
  //   path: 'albums',
  //   loadChildren:()=> import('./album/album.module').then(m=>m.AlbumModule)
  // },
  // { path: 'dashboard', component: DashboardComponent, children: [
  //   { path: 'prizes', component: PrizeListComponent },
  //   { path: 'albums', component: AlbumListarComponent },
  //   { path: 'collectors', component: CollectorListarComponent},
  //   { path: 'musicians', component: MusicianListarComponent},
  //   {path: 'bands', component: BandListarComponent},
  // ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
