/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { PrizeService } from './prize.service';
import { SharedModule } from '../shared/shared.module';
import { HttpTestingController, HttpClientTestingModule, } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import * as faker from 'faker';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import { Prize} from './prize';
import { HttpClient, HttpResponse } from '@angular/common/http';


describe('Service: Prize', () => {
  let injector: TestBed;
  let service: PrizeService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let apiUrl = environment.baseUrl + 'prizes';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrizeService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    service = injector.get(PrizeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should ...', inject([PrizeService], (service: PrizeService) => {
    expect(service).toBeTruthy();
  }));

  it("getPrizes() should return 2 records", () => {
    let mockPosts: Prize[] = [];

    for (let i = 1; i < 3; i++) {
      let prize = new Prize(

        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.paragraph()
      );

      mockPosts.push(prize);
    }

    service.getPrizes().subscribe((prizes) => {
      expect(prizes.length).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
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

    // createPrizeD should have made ONE request to POST prize
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newPrize);

    // Expect server to return the prize after Post
    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newPrize});
    req.event(expectedResponse);
    req.flush(newPrize);

  });





});
