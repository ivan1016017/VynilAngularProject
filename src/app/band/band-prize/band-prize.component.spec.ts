/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { BandPrizeComponent } from './band-prize.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Band } from '../band';
import * as faker from 'faker';
import { PrizeService } from 'src/app/prize/prize.service';
import {PrizeDetail} from '../../prize/prizeDetail';
import { BandService} from 'src/app/band/band.service';
import { BandDetail} from '../bandDetail'

import { Prize } from 'src/app/prize/prize';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {BandCreateComponent} from '../band-create/band-create.component';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import {PrizeCreateComponent} from '../../prize/prize-create/prize-create.component'


class MockPrizeService {
  getPrizes(): Observable<Array<Prize>> {
    let testPrizes: Array<Prize>;
    testPrizes = [];
    let testPrize: Prize;
    testPrize = new Prize();
    testPrize.id = 99,
    testPrize.name = 'Test Prize',
    testPrize.organization = 'Test Organization',
    testPrize.description = 'Test Description';
    testPrizes.push(testPrize);
    return of(testPrizes);
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



describe('BandPrizeComponent', () => {
  let component: BandPrizeComponent;
  let fixture: ComponentFixture<BandPrizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandPrizeComponent ],
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
    providers: [ { provide: PrizeService, useClass: MockPrizeService}, { provide: BandService, useClass: MockBandService} ],
    schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BandPrizeComponent);
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
  let componentBand: BandCreateComponent;
  let fixtureBand: ComponentFixture<BandCreateComponent>;
  let componentPrize: PrizeCreateComponent;
  let fixturePrize: ComponentFixture<PrizeCreateComponent>;
  let componentBandPrize: BandPrizeComponent;
  let fixtureMusicianPrize: ComponentFixture<BandPrizeComponent>;
  let serviceMusician: BandService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'musicians';

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
    fixtureBand = TestBed.createComponent(BandCreateComponent);
    componentBand = fixtureBand.componentInstance;
    fixtureBand.detectChanges();
    fixturePrize = TestBed.createComponent(PrizeCreateComponent);
    componentPrize = fixturePrize.componentInstance;
    fixturePrize.detectChanges();
    fixtureMusicianPrize = TestBed.createComponent(BandPrizeComponent);
    componentBandPrize = fixtureMusicianPrize.componentInstance;
    fixtureMusicianPrize.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    serviceMusician = injector.get(BandService);
  });

  // fit('name musician validity', () => {
  //   let name = componentBand.bandForm.controls.name.value;
  //   expect(name.valid).toBeFalsy();
  // });

  it('submitting band form', () => {
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');
    componentBand.bandForm.controls['name'].setValue('Dana');
    componentBand.bandForm.controls['description'].setValue(
      'This is the description of Dana'
    );
    componentBand.bandForm.controls['creationDate'].setValue(sampleDate);
    expect(componentBand.bandForm.valid).toBeTruthy();
  });

  // fit('description validity', () => {
  //   let description = componentBand.bandForm.controls.description.value;
  //   expect(description.valid).toBeFalsy();
  // });

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

  it('submitting prize form', () => {

    componentPrize.prizeForm.controls['name'].setValue('Dana');
    componentPrize.prizeForm.controls['description'].setValue(
      "this is the description of the new award"
    );
    componentPrize.prizeForm.controls['organization'].setValue("American Music")

    expect(componentPrize.prizeForm.valid).toBeTruthy();
  });



  it('creation validity', () => {
    let testPrize: PrizeDetail;
    testPrize = new PrizeDetail();
    testPrize.id = 1
    testPrize.name = faker.lorem.word();
    testPrize.organization = faker.lorem.word()
    testPrize.description = faker.lorem.sentence();

    componentPrize.createPrize(testPrize);
    console.log(componentPrize.createPrize(testPrize));
  });

  it('add prize to musician', () => {
    // Date
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');


    // Create musician
    let testBand: BandDetail;
    testBand = new BandDetail();
    testBand.id = 1
    testBand.name = faker.lorem.word();
    testBand.image = faker.image.imageUrl();
    testBand.description = faker.lorem.word();
    componentBand.createBand(testBand);

    // Create Prize
    let testPrize: PrizeDetail;
    testPrize = new PrizeDetail();
    testPrize.id = 1
    testPrize.name = faker.lorem.word();
    testPrize.organization = faker.lorem.word()
    testPrize.description = faker.lorem.sentence();
    componentPrize.createPrize(testPrize);

    componentBandPrize.bandForm.controls["prize"].setValue(testPrize);
    componentBandPrize.bandForm.controls["band"].setValue(testBand);
    componentBandPrize.bandForm.controls["premiationDate"].setValue(sampleDate);

    expect(componentBandPrize.bandForm.valid).toBeTruthy();

    componentBandPrize.createPrizeToBand(testBand);


  })


});
