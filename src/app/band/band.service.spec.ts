/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { BandService } from './band.service';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import * as faker from 'faker';
import { Band } from './band';
import {BandDetail} from './bandDetail'
import { environment } from '../../environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BandCreateComponent } from './band-create/band-create.component';


describe('Service: Band', () => {
  let injector: TestBed;
  let service: BandService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + 'bands';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BandService],
      schemas: [NO_ERRORS_SCHEMA]

    });
    injector = getTestBed();
    service = injector.get(BandService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should ...', inject([BandService], (service: BandService) => {
    expect(service).toBeTruthy();
  }));

  it("getBands() should return 2 records", () => {
    let mockPosts: Band[] = [];

    for (let i = 1; i < 3; i++) {
      let band = new Band(

        faker.lorem.word(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        faker.date.past(),
        faker.datatype.number()
      );

      mockPosts.push(band);
    }

    service.getBands().subscribe((bands) => {
      expect(bands.length).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });

  it('should add a band and return it', () => {
    let newBand = new BandDetail();
    newBand.name = faker.lorem.word();
    newBand.image = faker.image.imageUrl();
    newBand.description = faker.lorem.word();

    service.createBandD(newBand).subscribe(
      data => expect(data).toEqual(newBand, 'should return the band'),
      fail
    );

    // createBandD should have made ONE request to POST prize
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newBand);

    // Expect server to return the prize after Post
    const expectedResponse = new HttpResponse({ status: 201, statusText: 'createBandD', body: newBand});
    req.event(expectedResponse);
    req.flush(newBand);

  });

});


