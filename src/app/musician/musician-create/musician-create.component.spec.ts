/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  getTestBed,
  inject,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { MusicianCreateComponent } from './musician-create.component';
import { MusicianDetail } from '../musicianDetail';
import { MusicianService } from '../musician.service';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import * as faker from 'faker';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { Musician } from '../musician';
import { first } from 'rxjs/operators';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MusicianCreateComponent', () => {
  let component: MusicianCreateComponent;
  let fixture: ComponentFixture<MusicianCreateComponent>;
  let service: MusicianService;
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
    fixture = TestBed.createComponent(MusicianCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(MusicianService);
  });

  it('should create', inject([MusicianService], (service: MusicianService) => {
    expect(component).toBeTruthy();
  }));

  it('should create new musician and return it', () => {
    let testMusician: MusicianDetail;
    testMusician = new MusicianDetail();
    testMusician.id = faker.datatype.number();
    testMusician.name = faker.lorem.word();
    testMusician.image = faker.image.imageUrl();
    testMusician.description = faker.lorem.word();

    service
      .createmusicianD(testMusician)
      .subscribe(
        (data) =>
          expect(data).toEqual(testMusician, 'should return the musician'),
        fail
      );
  });
});

describe('SignForm Component', () => {
  let component: MusicianCreateComponent;
  let fixture: ComponentFixture<MusicianCreateComponent>;
  let service: MusicianService;
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
    fixture = TestBed.createComponent(MusicianCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(MusicianService);
  });

  it('name validity', () => {
    let name = component.musicianForm.controls.name.value;
    expect(name.valid).toBeFalsy();
  });

  it('submitting form', () => {
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');
    component.musicianForm.controls['name'].setValue('Dana');
    component.musicianForm.controls['description'].setValue(
      'This is the description of Dana'
    );
    component.musicianForm.controls['birthDate'].setValue(sampleDate);
    expect(component.musicianForm.valid).toBeTruthy();
  });

  it('description validity', () => {
    let description = component.musicianForm.controls.description.value;
    expect(description.valid).toBeFalsy();
  });

  it('creation validity', () => {
    let testMusician: MusicianDetail;
    testMusician = new MusicianDetail();
    testMusician.id = faker.datatype.number();
    testMusician.name = faker.lorem.word();
    testMusician.image = faker.image.imageUrl();
    testMusician.description = faker.lorem.word();

    component.createMusician(testMusician);
    console.log(component.createMusician(testMusician));
  });
});
