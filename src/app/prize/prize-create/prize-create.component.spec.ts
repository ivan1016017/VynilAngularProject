/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrizeCreateComponent } from './prize-create.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpTestingController} from '@angular/common/http/testing';
import { PrizeService } from '../prize.service';
import { Prize} from '../prize';
import { environment } from '../../../environments/environment';
import * as faker from 'faker';
import { MaterialModule } from '../../material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {PrizeDetail} from '../prizeDetail';



describe('PrizeCreateComponent', () => {
  let injector: TestBed;
  let service: PrizeService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'prizes';
  let component: PrizeCreateComponent;
  let fixture: ComponentFixture<PrizeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule,RouterTestingModule,HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule,ToastrModule.forRoot(), BrowserAnimationsModule, MatFormFieldModule, MatInputModule],
      providers: [PrizeService],
      declarations: [ PrizeCreateComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    service = injector.get(PrizeService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.prizeForm.valid).toBeFalsy();
  });

  it('should add a prize and return it', () => {
    let newPrize = new Prize(

      faker.datatype.number(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.paragraph()
    );

    service.createprizeD(newPrize).subscribe(
      data => expect(data).toEqual(newPrize, 'should return the prize'),
      fail
    );
    });
})


describe('SignForm Component', () => {
  let component: PrizeCreateComponent;
  let fixture: ComponentFixture<PrizeCreateComponent>;
  let service: PrizeService;
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
      declarations: [PrizeCreateComponent],
      providers: [PrizeService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(PrizeService);
  });

  it('name validity', () => {
    let name = component.prizeForm.controls['name']


  });

  it('submitting form', () => {

    component.prizeForm.controls['name'].setValue('Dana');
    component.prizeForm.controls['description'].setValue(
      "this is the description of the new award"
    );
    component.prizeForm.controls['organization'].setValue("American Music")

    expect(component.prizeForm.valid).toBeTruthy();
  });

  it('organization validity', () => {
    let organization = component.prizeForm.controls.organization.value;
    expect(organization.valid).toBeFalsy();
  });

  it('creation validity', () => {
    let testPrize: PrizeDetail;
    testPrize = new PrizeDetail();
    testPrize.name = faker.lorem.word();
    testPrize.organization = faker.lorem.word()
    testPrize.description = faker.lorem.sentence();

    component.createPrize(testPrize);
    console.log(component.createPrize(testPrize));
  });
});
