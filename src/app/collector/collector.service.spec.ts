/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { CollectorService } from './collector.service';

import {HttpTestingController,HttpClientTestingModule,
 } from "@angular/common/http/testing";

import * as faker from 'faker';
import { Collector } from "./collector";
import { environment } from "../../environments/environment";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { CdkPortal } from '@angular/cdk/portal';
import { CollectorDetail } from './collectorDetail';


describe('Service: Collector', () => {
  let injector: TestBed;
  let service: CollectorService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + "collectors";



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectorService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    service = injector.get(CollectorService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service', inject([CollectorService], (service: CollectorService) => {
    expect(service).toBeTruthy();
  }));

  it("getCollector() should return 2 records", () => {
    let mockPosts: Collector[] = [];

    for (let i = 1; i < 3; i++) {
      let collector = new Collector(
        faker.datatype.number(),
        faker.lorem.word(),
        Number(faker.phone.phoneNumber()),
        faker.internet.email()
      );

      mockPosts.push(collector);
    }

    service.getCollectors().subscribe((collectors) => {
      expect(collectors.length).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });

  it('should add a collector and return it', () => {
    let newCollector = new CollectorDetail();
    newCollector.name = faker.lorem.word();
    newCollector.telephone = faker.datatype.number();
    newCollector.email = faker.internet.email();

    service.createCollectorD(newCollector).subscribe(
      data => expect(data).toEqual(newCollector, 'should return the musician'),
      fail
    );

    // createCollectorD should have made ONE request to POST prize
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newCollector);

    // Expect server to return the prize after Post
    const expectedResponse = new HttpResponse({ status: 201, statusText: 'createCollectorD', body: newCollector});
    req.event(expectedResponse);
    req.flush(newCollector);

  });


});
