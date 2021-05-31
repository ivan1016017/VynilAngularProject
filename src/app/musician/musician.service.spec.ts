/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { MusicianService } from './musician.service';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import * as faker from 'faker';
import { Musician } from './musician';
import { environment } from '../../environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MusicianDetail } from './musicianDetail';



describe('Service: Musician', () => {
  let injector: TestBed;
  let service: MusicianService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + 'musicians';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicianService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    service = injector.get(MusicianService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should ...', inject([MusicianService], (service: MusicianService) => {
    expect(service).toBeTruthy();
  }));

  it("getMusicians() should return 2 records", () => {
    let mockPosts: Musician[] = [];

    for (let i = 1; i < 3; i++) {
      let musician = new Musician(

        faker.datatype.number(),
        faker.lorem.word(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        faker.date.past()
      );

      mockPosts.push(musician);
    }

    service.getMusicians().subscribe((musicians) => {
      expect(musicians.length).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });

  it('should add a musician and return it', () => {
    let newMusician = new MusicianDetail();
    newMusician.name = faker.lorem.word();
    newMusician.image = faker.image.imageUrl();
    newMusician.description = faker.lorem.word();

    service.createmusicianD(newMusician).subscribe(
      data => expect(data).toEqual(newMusician, 'should return the musician'),
      fail
    );

    // createmusicianD should have made ONE request to POST prize
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newMusician);

    // Expect server to return the prize after Post
    const expectedResponse = new HttpResponse({ status: 201, statusText: 'createmusicianD', body: newMusician});
    req.event(expectedResponse);
    req.flush(newMusician);

  });


});
