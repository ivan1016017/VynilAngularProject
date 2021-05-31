import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component'
import { MaterialModule } from '../material.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/riel-card/card/card.component';
import { RielCardComponent } from './components/riel-card/riel-card.component';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,

  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    RielCardComponent,
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    CardComponent,
    RielCardComponent
  ]
})
export class SharedModule { }
