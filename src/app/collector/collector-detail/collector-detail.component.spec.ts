/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorDetailComponent } from './collector-detail.component';
import { Collector} from '../collector'
import { CollectorDetail } from '../collectorDetail';
import { AlbumService } from 'src/app/album/album.service';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Album } from 'src/app/album/album';

describe('CollectorDetailComponent', () => {
  let component: CollectorDetailComponent;
  let fixture: ComponentFixture<CollectorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorDetailComponent ],
      imports:[CommonModule,RouterTestingModule,HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorDetailComponent);
    component = fixture.componentInstance;
    component.collectorDetail = new CollectorDetail()
    fixture.detectChanges();
  });

  // it('should use getAlbums from albumService', () => {
  //   const albumService = fixture.debugElement.injector.get(AlbumService);
  //   fixture.detectChanges();
  //   expect(albumService.getAlbums()).toEqual(component.collectorDetail);
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
