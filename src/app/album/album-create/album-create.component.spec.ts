/* tslint:disable:no-unused-variable */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed,
  inject,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumService } from 'src/app/album/album.service';
import { AlbumCreateComponent } from './album-create.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { AlbumDetail } from 'src/app/album/albumDetail';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { sample } from 'rxjs/operators';

enum GENRE {
  Classical,
  Salsa,
  Rock,
  Folk,
}
enum RECORD_LABEL {
  Sony_Music,
  EMI,
  Discos_Fuentes,
  Elektra,
  Fania_Record,
}

class MockAlbumService {
  getAlbums(): Observable<Array<AlbumDetail>> {
    let testAlbums: Array<AlbumDetail>;
    testAlbums = [];
    let testAlbum: AlbumDetail;
    testAlbum = new AlbumDetail();
    (testAlbum.id = 998),
      (testAlbum.name = faker.lorem.word()),
      (testAlbum.cover = faker.internet.url()),
      (testAlbum.releaseDate = faker.date.past()),
      (testAlbum.description = faker.lorem.words(4)),
      (testAlbum.genre = GENRE[faker.random.objectElement(GENRE)]),
      (testAlbum.recordLabel =
        RECORD_LABEL[faker.random.objectElement(RECORD_LABEL)]),
      (testAlbum.tracks = []),
      (testAlbum.comments = []);
    testAlbums.push(testAlbum);
    return of(testAlbums);
  }
}

describe('AlbumCreateComponent', () => {
  let component: AlbumCreateComponent;
  let fixture: ComponentFixture<AlbumCreateComponent>;
  let service: AlbumService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'albums';

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
      declarations: [AlbumCreateComponent],
      providers: [AlbumService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(AlbumService);
  });

  it('should create', inject([AlbumService], (service: AlbumService) => {
    expect(component).toBeTruthy();
  }));

  it('form invalid when empty', () => {
    expect(component.albumForm.valid).toBeFalsy();
  });


  it('should create new album and return it', () => {
    let testAlbum: AlbumDetail;
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');
    testAlbum = new AlbumDetail();
    testAlbum.name = faker.lorem.word();
    testAlbum.cover = faker.image.imageUrl();
    testAlbum.releaseDate = sampleDate;
    testAlbum.description = faker.lorem.word();
    testAlbum.genre = GENRE[faker.random.objectElement(GENRE)]
    testAlbum.recordLabel = RECORD_LABEL[faker.random.objectElement(RECORD_LABEL)]

    service
      .createalbumD(testAlbum)
      .subscribe(
        (data) =>
          expect(data).toEqual(testAlbum, 'should return the album'),
        fail
      );
  });

});


describe('SignForm Component', () => {
  let component: AlbumCreateComponent;
  let fixture: ComponentFixture<AlbumCreateComponent>;
  let service: AlbumService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'albums';

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
      declarations: [AlbumCreateComponent],
      providers: [AlbumService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(AlbumService);
  });

  it('name validity', () => {
    let name = component.albumForm.controls['name']


  });

  it('submitting form', () => {
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');
    component.albumForm.controls['name'].setValue('Dana');
    component.albumForm.controls['description'].setValue(
      'This is the description of Dana'
    );
    component.albumForm.controls['releaseDate'].setValue(sampleDate);
    component.albumForm.controls['genre'].setValue(GENRE[faker.random.objectElement(GENRE)])
    component.albumForm.controls['recordLabel'].setValue(RECORD_LABEL[faker.random.objectElement(RECORD_LABEL)])

    expect(component.albumForm.valid).toBeTruthy();
  });

  it('description validity', () => {
    let description = component.albumForm.controls.description.value;
    expect(description.valid).toBeFalsy();
  });

  it('creation validity', () => {
    let testAlbum: AlbumDetail;
    testAlbum = new AlbumDetail();
    testAlbum.id = faker.datatype.number();
    testAlbum.name = faker.lorem.word();
    testAlbum.cover = faker.image.imageUrl();
    testAlbum.description = faker.lorem.word();

    component.createAlbum(testAlbum);
    console.log(component.createAlbum(testAlbum));
  });
});

