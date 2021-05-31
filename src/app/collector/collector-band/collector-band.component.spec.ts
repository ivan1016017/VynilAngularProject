/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectorBandComponent } from './collector-band.component';
import { CollectorService } from 'src/app/collector/collector.service';
import { CollectorDetail } from '../collectorDetail';
import { BandService} from 'src/app/band/band.service';
import { BandDetail} from 'src/app/band/bandDetail';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';


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

describe('CollectorBandComponent', () => {
  let component: CollectorBandComponent;
  let fixture: ComponentFixture<CollectorBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorBandComponent ],
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
    providers: [ { provide: BandService, useClass: MockBandService}, { provide: CollectorService, useClass: MockCollectorService} ],
    schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorBandComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('form invalid when empty', () => {
  //   expect(component.collectorForm.valid).toBeFalsy();
  // })
});
