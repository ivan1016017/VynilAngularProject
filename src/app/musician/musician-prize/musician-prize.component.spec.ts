/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { MusicianPrizeComponent } from './musician-prize.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PrizeService } from 'src/app/prize/prize.service';
import { Prize } from 'src/app/prize/prize';
import { PrizeDetail} from 'src/app/prize/prizeDetail'
import { Musician } from 'src/app/musician/musician'
import { MusicianService } from '../musician.service';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { MusicianDetail } from '../musicianDetail';
import {MusicianCreateComponent} from '../musician-create/musician-create.component'
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
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

describe('MusicianPrizeComponent', () => {
  let componentMusician: MusicianPrizeComponent;
  let fixture: ComponentFixture<MusicianPrizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianPrizeComponent ],
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
    providers: [ { provide: PrizeService, useClass: MockPrizeService}, { provide: MusicianService, useClass: MockMusicianService} ],
    schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianPrizeComponent);
    componentMusician = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentMusician).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(componentMusician.musicianForm.valid).toBeFalsy();
  })

});


describe('SignForm Component', () => {
  let componentMusician: MusicianCreateComponent;
  let fixtureMusician: ComponentFixture<MusicianCreateComponent>;
  let componentPrize: PrizeCreateComponent;
  let fixturePrize: ComponentFixture<PrizeCreateComponent>;
  let componentMusicianPrize: MusicianPrizeComponent;
  let fixtureMusicianPrize: ComponentFixture<MusicianPrizeComponent>;
  let serviceMusician: MusicianService;
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
      declarations: [MusicianCreateComponent],
      providers: [MusicianService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixtureMusician = TestBed.createComponent(MusicianCreateComponent);
    componentMusician = fixtureMusician.componentInstance;
    fixtureMusician.detectChanges();
    fixturePrize = TestBed.createComponent(PrizeCreateComponent);
    componentPrize = fixturePrize.componentInstance;
    fixturePrize.detectChanges();
    fixtureMusicianPrize = TestBed.createComponent(MusicianPrizeComponent);
    componentMusicianPrize = fixtureMusicianPrize.componentInstance;
    fixtureMusicianPrize.detectChanges();
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
    let testMusician: MusicianDetail;
    testMusician = new MusicianDetail();
    testMusician.id = 1
    testMusician.name = faker.lorem.word();
    testMusician.image = faker.image.imageUrl();
    testMusician.description = faker.lorem.word();
    componentMusician.createMusician(testMusician);

    // Create Prize
    let testPrize: PrizeDetail;
    testPrize = new PrizeDetail();
    testPrize.id = 1
    testPrize.name = faker.lorem.word();
    testPrize.organization = faker.lorem.word()
    testPrize.description = faker.lorem.sentence();
    componentPrize.createPrize(testPrize);

    componentMusicianPrize.musicianForm.controls["prize"].setValue(testPrize);
    componentMusicianPrize.musicianForm.controls["musician"].setValue(testMusician);
    componentMusicianPrize.musicianForm.controls["premiationDate"].setValue(sampleDate);

    expect(componentMusicianPrize.musicianForm.valid).toBeTruthy();

    componentMusicianPrize.createMusician(testMusician);


  })


});
