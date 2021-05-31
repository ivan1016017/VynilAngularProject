/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CollectorMusicianComponent } from './collector-musician.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { CollectorService } from 'src/app/collector/collector.service';
import { CollectorDetail } from '../collectorDetail';
import { MusicianService } from 'src/app/musician/musician.service';
import { MusicianDetail } from 'src/app/musician/musicianDetail';


class MockCollectorService {
  getCollectors(): Observable<Array<CollectorDetail>> {
    let testCollectors: Array<CollectorDetail>;
    testCollectors = [];
    let testCollector: CollectorDetail;
    testCollector = new CollectorDetail();
    testCollector.id = faker.datatype.number(),
    testCollector.name = faker.lorem.word(),
    testCollector.telephone = faker.datatype.number(7),
    testCollector.email = faker.internet.email();
    testCollectors.push(testCollector);
    return of(testCollectors);
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


describe('CollectorMusicianComponent', () => {
  let component: CollectorMusicianComponent;
  let fixture: ComponentFixture<CollectorMusicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorMusicianComponent ],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterTestingModule,
        MatSelectModule,
        BrowserAnimationsModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorMusicianComponent ],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterTestingModule,
        MatSelectModule,
        BrowserAnimationsModule
    ],
    providers: [ { provide: MusicianService, useClass: MockMusicianService}, { provide: CollectorService, useClass: MockCollectorService} ],
    schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorMusicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.collectorForm.valid).toBeFalsy();
  })

});
