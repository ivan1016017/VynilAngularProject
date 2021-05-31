import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  getTestBed,
  inject,
  TestBed,
} from '@angular/core/testing';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CollectorCreateComponent } from './collector-create.component';
import { Observable, of } from 'rxjs';
import { CollectorDetail } from '../collectorDetail';
import * as faker from 'faker';
import { CollectorService } from '../collector.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// class MockCollectorService {
//   getCollectors(): Observable<Array<CollectorDetail>> {
//     let testCollectors: Array<CollectorDetail>;
//     testCollectors = [];
//     let testCollector: CollectorDetail;
//     testCollector = new CollectorDetail();
//     testCollector.id = faker.datatype.number(),
//     testCollector.name = faker.lorem.word(),
//     testCollector.telephone = faker.datatype.number(7),
//     testCollector.email = faker.internet.email();
//     testCollectors.push(testCollector);
//     return of(testCollectors);
//   }

// createCollectorD(): Observable<CollectorDetail> {

//   return of(testCollector)
// }
//}

describe('CollectorCreateComponent', () => {
  let component: CollectorCreateComponent;
  let fixture: ComponentFixture<CollectorCreateComponent>;
  let service: CollectorService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'prizes';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectorCreateComponent],
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        ToastrModule.forRoot(),
      ],
      providers: [CollectorService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(CollectorService);
  });

  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('should create', inject(
    [CollectorService],
    (service: CollectorService) => {
      expect(component).toBeTruthy();
    }
  ));

  // it('should create new collector and return it', () => {
  //   let testCollector: CollectorDetail;
  //   testCollector = new CollectorDetail();
  //   (testCollector.id = faker.datatype.number()),
  //     (testCollector.name = faker.lorem.word()),
  //     (testCollector.telephone = faker.datatype.number(7)),
  //     (testCollector.email = faker.internet.email());

  //   service
  //     .createCollectorD(testCollector)
  //     .subscribe(
  //       (data) =>
  //         expect(data).toEqual(testCollector, 'should return the collector'),
  //       fail
  //     );

    // const req = httpMock.expectOne(service.apiUrl);
    // expect(req.request.method).toEqual('POST');
    // expect(req.request.body).toEqual(testCollector);
    // const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: testCollector});
    // req.event(expectedResponse);
    // req.flush(testCollector);
  // });
});



describe('SignForm Component', () => {
  let component: CollectorCreateComponent;
  let fixture: ComponentFixture<CollectorCreateComponent>;
  let service: CollectorService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'collectors';

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
      declarations: [CollectorCreateComponent],
      providers: [CollectorService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(CollectorService);
  });

  it('name validity', () => {
    let name = component.collectorForm.controls['name']


  });

  it('submitting form', () => {

    component.collectorForm.controls['name'].setValue('Dana');
    component.collectorForm.controls['telephone'].setValue(
      Number(faker.phone.phoneNumber())
    );
    component.collectorForm.controls['email'].setValue(faker.internet.email())

    expect(component.collectorForm.valid).toBeTruthy();
  });

  it('email validity', () => {
    let email = component.collectorForm.controls.email.value;
    expect(email.valid).toBeFalsy();
  });

  it('creation validity', () => {
    let testCollector: CollectorDetail;
    testCollector = new CollectorDetail();
    testCollector.name = faker.lorem.word();
    testCollector.telephone = Number(faker.phone.phoneNumber())
    testCollector.email = faker.phone.phoneNumber();

    component.createCollector(testCollector);
    console.log(component.createCollector(testCollector));
  });
});

