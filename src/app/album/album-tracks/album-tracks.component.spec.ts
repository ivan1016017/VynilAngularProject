/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AlbumTracksComponent } from './album-tracks.component';


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
import { AlbumDetail } from '../albumDetail';
import { BandService} from 'src/app/band/band.service';



import { HttpClient, HttpResponse } from '@angular/common/http';
import {AlbumCreateComponent} from '../album-create/album-create.component'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AlbumService } from '../album.service';



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


describe('AlbumTracksComponent', () => {
  let component: AlbumTracksComponent;
  let fixture: ComponentFixture<AlbumTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumTracksComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});


describe('SignForm Component', () => {
  let componentAlbum: AlbumCreateComponent;
  let fixtureAlbum: ComponentFixture<AlbumCreateComponent>;
  let componentAlbumTrack: AlbumTracksComponent;
  let fixtureAlbumTrack: ComponentFixture<AlbumTracksComponent>;

  let serviceAlbum: AlbumService;
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
      declarations: [AlbumCreateComponent],
      providers: [AlbumService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixtureAlbum = TestBed.createComponent(AlbumCreateComponent);
    componentAlbum = fixtureAlbum.componentInstance;
    fixtureAlbum.detectChanges();
    fixtureAlbumTrack = TestBed.createComponent(AlbumTracksComponent);
    componentAlbumTrack = fixtureAlbumTrack.componentInstance;
    fixtureAlbumTrack.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    serviceAlbum = injector.get(AlbumService);
  });




  it('submitting Album form', () => {
    let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');
    componentAlbum.albumForm.controls['name'].setValue('Dana');
    componentAlbum.albumForm.controls['description'].setValue(
      'This is the description of Dana'
    );
    componentAlbum.albumForm.controls['releaseDate'].setValue(sampleDate);
    componentAlbum.albumForm.controls['genre'].setValue(GENRE[faker.random.objectElement(GENRE)])
    componentAlbum.albumForm.controls['recordLabel'].setValue(RECORD_LABEL[faker.random.objectElement(RECORD_LABEL)])
    expect(componentAlbum.albumForm.valid).toBeTruthy();
  });


  it('creation validity', () => {
    let testAlbum: AlbumDetail;
    testAlbum = new AlbumDetail();
    testAlbum.id = faker.datatype.number();
    testAlbum.name = faker.lorem.word();
    testAlbum.cover = faker.image.imageUrl();
    testAlbum.description = faker.lorem.word();

    componentAlbum.createAlbum(testAlbum);
    console.log(componentAlbum.createAlbum(testAlbum));
  });


  it('add track to album', () => {
    // create album
    let testAlbum: AlbumDetail;
    testAlbum = new AlbumDetail();
    testAlbum.id = faker.datatype.number();
    testAlbum.name = faker.lorem.word();
    testAlbum.cover = faker.image.imageUrl();
    testAlbum.description = faker.lorem.word();

    componentAlbum.createAlbum(testAlbum);



    componentAlbumTrack.albumForm.controls["album"].setValue(testAlbum);
    componentAlbumTrack.albumForm.controls["nameTrack"].setValue(faker.lorem.word());
    componentAlbumTrack.albumForm.controls["durationTrack"].setValue("01:35");



    expect(componentAlbumTrack.albumForm.valid).toBeTruthy();

    componentAlbumTrack.createTrackAlbum(testAlbum);


  })


});
