/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from "@angular/core/testing";
import { AlbumService } from "./album.service";

import {
  HttpTestingController,
  HttpClientTestingModule,
 } from "@angular/common/http/testing";

import * as faker from 'faker';
import { Album } from "./album";
import {AlbumDetail} from './albumDetail'
import { environment } from "../../environments/environment";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';


describe('Service: Album', () => {
  let injector: TestBed;
  let service: AlbumService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + "albums";

  enum GENRE{
    Classical,
    Salsa,
    Rock,
    Folk
  };
  enum RECORD_LABEL{
    Sony_Music,
    EMI, Discos_Fuentes,
    Elektra,
    Fania_Record
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
      schemas: [NO_ERRORS_SCHEMA]

    });
    injector = getTestBed();
    service = injector.get(AlbumService);
    httpMock = injector.get(HttpTestingController);



  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return service Album', inject([AlbumService], (service: AlbumService) => {
    expect(service).toBeTruthy();
  }));

  it("getAlbum() should return 10 records", () => {
    let mockPosts: Album[] = [];

    for (let i = 1; i < 11; i++) {
      let album = new Album(

        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.date.past(),
        faker.lorem.sentence(),
        GENRE[faker.random.objectElement(GENRE)],
        RECORD_LABEL[faker.random.objectElement(RECORD_LABEL)],
        i
      );

      mockPosts.push(album);
    }

    service.getAlbums().subscribe((albums) => {
      expect(albums.length).toBe(10);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });

  it('should add a album and return it', () => {
    let newAlbum = new AlbumDetail();
    newAlbum.name = faker.lorem.word();
    newAlbum.cover = faker.lorem.sentence()
    newAlbum.releaseDate = faker.date.past();
    newAlbum.description = faker.lorem.sentence();
    newAlbum.description = faker.lorem.word();
    newAlbum.genre = GENRE[faker.random.objectElement(GENRE)];
    newAlbum.recordLabel = RECORD_LABEL[faker.random.objectElement(RECORD_LABEL)]


    service.createalbumD(newAlbum).subscribe(
      data => expect(data).toEqual(newAlbum, 'should return the album'),
      fail
    );

    // createalbumD should have made ONE request to POST prize
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newAlbum);

    // Expect server to return the prize after Post
    const expectedResponse = new HttpResponse({ status: 201, statusText: 'createalbumD', body: newAlbum});
    req.event(expectedResponse);
    req.flush(newAlbum);

  });

});
