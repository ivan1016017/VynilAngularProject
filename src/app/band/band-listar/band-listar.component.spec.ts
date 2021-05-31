/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {BandListarComponent} from './band-listar.component';
import {BandService} from '../band.service';
import {BandDetail} from '../bandDetail';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as faker from "faker";
import { Observable, of } from 'rxjs';

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

describe('BandListarComponent', () => {
  let component: BandListarComponent;
  let fixture: ComponentFixture<BandListarComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandListarComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ { provide: BandService, useClass: MockBandService} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



describe('Measure length of components in a list', () => {
  let bandListarComponent: BandListarComponent;
  let bandService: BandService;
  let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');




  beforeEach(() => {
    bandListarComponent = new BandListarComponent(bandService);
  });

  it('should set instance correctly', () => {
    expect(bandListarComponent).not.toBeNull();
  });

  it('should be no contacts if there is no data', () => {
    expect(bandListarComponent.bands).toBeUndefined();
  });

  it('should be an array of length one if there is an element there', () => {
    let band: BandDetail = new BandDetail();
    band.name = 'My band';
    band.image =
      'https://st.depositphotos.com/1015158/3751/v/950/depositphotos_37517485-stock-illustration-vinyl-record.jpg';
    band.description = 'This is the description of this band';
    band.creationDate = sampleDate;
    band.id = 100;
    bandListarComponent.bands = [];
    bandListarComponent.bands.push(band);
    expect(bandListarComponent.bands.length).toBe(1);
  });

  it('should show details of each one of the elements in the array', () => {
    let band: BandDetail = new BandDetail();
    band.name = 'My band';
    band.image =
      'https://st.depositphotos.com/1015158/3751/v/950/depositphotos_37517485-stock-illustration-vinyl-record.jpg';
    band.description = 'This is the description of this band';
    band.creationDate = sampleDate;
    band.id = 100;
    bandListarComponent.bands = [];
    bandListarComponent.bands.push(band);
    expect(bandListarComponent.bands[0].name).toBe('My band');
    expect(bandListarComponent.bands[0].description).toBe(
      'This is the description of this band'
    );
  });
});

