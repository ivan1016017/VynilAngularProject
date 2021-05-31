/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject, getTestBed } from '@angular/core/testing';
import { PrizeService } from '../prize.service';
import { SharedModule } from '../../shared/shared.module';
import { HttpTestingController, HttpClientTestingModule, } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PrizeDetailComponent } from './prize-detail.component';
import { DebugElement } from '@angular/core';
import * as faker from 'faker';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import { Prize} from '../prize';

const prizeId: number = faker.datatype.number();
const prize: Prize = {id:1, name: "Latin American Music Awards", organization: "Telemundo", description:"Los Latin American Music Awards (Latin AMAs) son un premio anual de música estadounidense presentado por Telemundo. Es la contraparte en español de los American Music Awards (AMA) producidos por Dick Clark Productions. Al igual que con los AMA, los Latin AMA están determinadas por una encuesta entre el público y los compradores de música."}


describe('PrizeDetailComponent', () => {
  let component: PrizeDetailComponent;
  let fixture: ComponentFixture<PrizeDetailComponent>;
  let debug: DebugElement;
  let httpTestingController: HttpTestingController;
  let prizeService: PrizeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeDetailComponent ],
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [PrizeService],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeDetailComponent);
    component = fixture.componentInstance;
    prizeService = TestBed.inject(PrizeService);
    fixture.detectChanges();
    debug = fixture.debugElement;
  });


  // it('should create the component', () => {
  //   const comp = fixture.debugElement.componentInstance;
  //   expect(comp).toBeTruthy();
  // });

  // it('should call #getPrizes and display component', () => {
  //   expect(component.featured).toEqual([{
  //     title: 'Correo Electronico',
  //     subtitle: ''
  //   },
  //   {
  //     title: 'Teléfono',
  //     subtitle: ''
  //   } ]);
  // });

  // it('should call #getCollector and format breadcrumbs', () => {
  //   expect(component.breadcrumbs).toEqual(['Home', 'Coleccionistas']);
  // });

  // it('get collector', fakeAsync(()=>{
  //   spyOn(collectorService, 'getCollector').and.returnValue(of(collector).pipe(delay(1)));
  //   component.getCollector(1);
  //   tick(1);
  //   expect(component.collector).toBe(collector)
  //   expect(component.breadcrumbs.indexOf(collector.name)).toBeGreaterThanOrEqual(0);
  // }))

});
