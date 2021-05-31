/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { BandDetailComponent } from './band-detail.component';
import { Band } from '../band';
import { BandDetail } from '../bandDetail';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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

describe('BandDetailComponent', () => {
  let component: BandDetailComponent;
  let fixture: ComponentFixture<BandDetailComponent>;
  // let sampleDate: Date = new Date("1970-01-01T00:00:00-05:00");

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandDetailComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandDetailComponent);
    component = fixture.componentInstance;
    component.bandDetail = new BandDetail();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
