/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  getTestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { BandCreateComponent } from './band-create.component';

import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import * as faker from 'faker';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { BandService } from '../band.service';
import {BandDetail} from '../bandDetail';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('BandCreateComponent', () => {
  let component: BandCreateComponent;
  let fixture: ComponentFixture<BandCreateComponent>;
  let service: BandService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'bands';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BandCreateComponent],
      providers: [BandService],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        ToastrModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(BandService);
  });

  it('should create', inject([BandService], (service: BandService) => {
    expect(component).toBeTruthy();
  }));


  it('should create new musician and return it', () => {
    let testBand: BandDetail;
    testBand = new BandDetail();
    testBand.id = faker.datatype.number();
    testBand.name = faker.lorem.word();
    testBand.image = faker.image.imageUrl();
    testBand.description = faker.lorem.word();

    service
      .createBandD(testBand)
      .subscribe(
        (data) =>
          expect(data).toEqual(testBand, 'should return the band'),
        fail
      );
  });
});




describe('SignForm Component', () => {
  let component: BandCreateComponent;
  let fixture: ComponentFixture<BandCreateComponent>;
  let service: BandService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'bamds';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        ToastrModule.forRoot(),
      ],
      declarations: [BandCreateComponent],
      providers: [BandService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(BandService);
  });

  it('name validity', () => {
    let name = component.bandForm.controls.name.value;
    expect(name.valid).toBeFalsy();
  });

  it('submitting form', () => {
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');
    component.bandForm.controls['name'].setValue('Dana');
    component.bandForm.controls['description'].setValue(
      'This is the description of Dana'
    );
    component.bandForm.controls['creationDate'].setValue(sampleDate);
    expect(component.bandForm.valid).toBeTruthy();
  });

  it('description validity', () => {
    let description = component.bandForm.controls.description.value;
    expect(description.valid).toBeFalsy();
  });

  it('creation validity', () => {
    let testBand: BandDetail;
    testBand = new BandDetail();
    testBand.id = faker.datatype.number();
    testBand.name = faker.lorem.word();
    testBand.image = faker.image.imageUrl();
    testBand.description = faker.lorem.word();

    component.createBand(testBand);
    console.log(component.createBand(testBand));
  });
});
