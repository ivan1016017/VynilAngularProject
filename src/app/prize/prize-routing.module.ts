import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrizeCreateComponent } from './prize-create/prize-create.component';


const routes: Routes=[
  {
    path: 'prizes',
    children:[{
      path: 'new',
      component: PrizeCreateComponent
    }]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrizeRoutingModule { }
