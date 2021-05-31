/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumListarComponent } from './album-listar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as faker from 'faker';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { AlbumDetail } from '../albumDetail';
import { AlbumDetailComponent } from '../album-detail/album-detail.component';
import { RECORD_LABEL, GENRE } from '../album';
import { bindCallback } from 'rxjs';

describe('AlbumListarComponent', () => {
  let component: AlbumListarComponent;
  let fixture: ComponentFixture<AlbumListarComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumListarComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Album list', () => {
    expect(component).toBeTruthy();
  });

});

describe('Measure length of components in a list', () => {
  let albumListarComponent: AlbumListarComponent;
  let albumService: AlbumService;

  let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');
  let recordLabel = RECORD_LABEL;
  let genre = GENRE;

  beforeEach(() => {
    albumListarComponent = new AlbumListarComponent(albumService);
  });

  it('should set instance correctly', () => {
    expect(albumListarComponent).not.toBeNull();
  });

  it('should be no contacts if there is no data', () => {
    expect(albumListarComponent.albums).toBeUndefined();
  });

  it('should be an array of length one if there is an element there', () => {
    let album: AlbumDetail = new AlbumDetail();
    album.name = 'My Album';
    album.cover =
      'https://st.depositphotos.com/1015158/3751/v/950/depositphotos_37517485-stock-illustration-vinyl-record.jpg';
    album.releaseDate = sampleDate;
    album.description = 'This is the description of this album';
    album.recordLabel = recordLabel.Elektra;
    album.genre = genre.Salsa;
    album.id = 100;
    album.comments = null;
    album.tracks = null;
    albumListarComponent.albums = [];
    albumListarComponent.albums.push(album);
    expect(albumListarComponent.albums.length).toBe(1);
  });

  it('should show details of each one of the elements in the array', () => {
    let album: AlbumDetail = new AlbumDetail();
    album.name = 'My Album';
    album.cover =
      'https://st.depositphotos.com/1015158/3751/v/950/depositphotos_37517485-stock-illustration-vinyl-record.jpg';
    album.releaseDate = sampleDate;
    album.description = 'This is the description of this album';
    album.recordLabel = recordLabel.Elektra;
    album.genre = genre.Salsa;
    album.id = 100;
    album.comments = null;
    album.tracks = null;
    albumListarComponent.albums = [];
    albumListarComponent.albums.push(album);
    expect(albumListarComponent.albums[0].name).toBe('My Album');
    expect(albumListarComponent.albums[0].description).toBe(
      'This is the description of this album'
    );
  });
});
