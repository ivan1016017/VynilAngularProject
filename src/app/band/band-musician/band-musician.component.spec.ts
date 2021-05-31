/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { BandMusicianComponent } from './band-musician.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { MusicianDetail } from 'src/app/musician/musicianDetail';
import { BandService} from 'src/app/band/band.service';
import { BandDetail} from '../bandDetail'
import { MusicianService } from 'src/app/musician/musician.service';
import { BandCreateComponent } from '../band-create/band-create.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {MusicianCreateComponent} from '../../musician/musician-create/musician-create.component'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';


class MockMusicianService {
  getMusicians(): Observable<Array<MusicianDetail>> {
    let testMusicians: Array<MusicianDetail>;
    testMusicians = [];
    let testMusician: MusicianDetail;
    testMusician=new MusicianDetail();
    testMusician.id = 199,
    testMusician.name ='Test Musician',
    testMusician.image = 'Fake image url',
    testMusician.description = "Test Musician description",
    testMusician.birthDate = faker.date.past(),
    testMusician.albums = [],
    testMusician.performerPrizes = [];
    testMusicians.push(testMusician);
    return of(testMusicians);
  }
}

class MockBandService {
  getBands(): Observable<Array<BandDetail>> {
    let testBands: Array<BandDetail>;
    testBands = [];
    let testBand: BandDetail;
    testBand=new BandDetail();
    testBand.id = 199,
    testBand.name ='Test Band',
    testBand.image = 'Fake image url',
    testBand.description = "Test Band Description",
    testBand.creationDate = faker.date.past(),
    testBand.albums = [],
    testBand.performerPrizes = [];
    testBands.push(testBand);
    return of(testBands);

  }
}


describe('BandMusicianComponent', () => {
  let component: BandMusicianComponent;
  let fixture: ComponentFixture<BandMusicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandMusicianComponent ],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterTestingModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [ { provide: BandService, useClass: MockBandService}, { provide: MusicianService, useClass: MockMusicianService} ],
    schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandMusicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.bandForm.valid).toBeFalsy();
  })
});





describe('SignForm Component', () => {
  let componentMusician: MusicianCreateComponent;
  let fixtureMusician: ComponentFixture<MusicianCreateComponent>;
  let componentBand: BandCreateComponent;
  let fixtureBand: ComponentFixture<BandCreateComponent>;
  let componentBandMusician: BandMusicianComponent;
  let fixtureBandMusician: ComponentFixture<BandMusicianComponent>;
  let serviceMusician: MusicianService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'bands';

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
      declarations: [MusicianCreateComponent],
      providers: [MusicianService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixtureMusician = TestBed.createComponent(MusicianCreateComponent);
    componentMusician = fixtureMusician.componentInstance;
    fixtureMusician.detectChanges();
    fixtureBand = TestBed.createComponent(BandCreateComponent);
    componentBand = fixtureBand.componentInstance;
    fixtureBand.detectChanges();
    fixtureBandMusician = TestBed.createComponent(BandMusicianComponent);
    componentBandMusician = fixtureBandMusician.componentInstance;
    fixtureBandMusician.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    serviceMusician = injector.get(MusicianService);
  });




  it('submitting musician form', () => {
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');
    componentMusician.musicianForm.controls['name'].setValue('Dana');
    componentMusician.musicianForm.controls['description'].setValue(
      'This is the description of Dana'
    );
    componentMusician.musicianForm.controls['birthDate'].setValue(sampleDate);
    expect(componentMusician.musicianForm.valid).toBeTruthy();
  });



  it('creation validity', () => {
    let testMusician: MusicianDetail;
    testMusician = new MusicianDetail();
    testMusician.id = 1
    testMusician.name = faker.lorem.word();
    testMusician.image = faker.image.imageUrl();
    testMusician.description = faker.lorem.word();

    componentMusician.createMusician(testMusician);
    console.log(componentMusician.createMusician(testMusician));
  });

  it('submitting band form', () => {
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');
    componentBand.bandForm.controls['name'].setValue('Dana');
    componentBand.bandForm.controls['description'].setValue(
      'This is the description of Dana'
    );
    componentBand.bandForm.controls['creationDate'].setValue(sampleDate);
    expect(componentBand.bandForm.valid).toBeTruthy();
  });



  it('creation validity', () => {
    let testBand: BandDetail;
    testBand = new BandDetail();
    testBand.id = 1
    testBand.name = faker.lorem.word();
    testBand.image = faker.image.imageUrl();
    testBand.description = faker.lorem.word();

    componentBand.createBand(testBand);
    console.log(componentBand.createBand(testBand));
  });

  it('add musician to band', () => {
    // Date
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');


    // Create musician
    let testMusician: MusicianDetail;
    testMusician = new MusicianDetail();
    testMusician.id = 1
    testMusician.name = faker.lorem.word();
    testMusician.image = faker.image.imageUrl();
    testMusician.description = faker.lorem.word();
    componentMusician.createMusician(testMusician);

    // Create musician
    let testBand: BandDetail;
    testBand = new BandDetail();
    testBand.id = 1
    testBand.name = faker.lorem.word();
    testBand.image = faker.image.imageUrl();
    testBand.description = faker.lorem.word();
    componentBand.createBand(testBand);

    componentBandMusician.bandForm.controls["band"].setValue(testBand);
    componentBandMusician.bandForm.controls["musician"].setValue(testMusician);


    expect(componentBandMusician.bandForm.valid).toBeTruthy();

    componentBandMusician.createMusicianBandLink(testBand);


  })


});

