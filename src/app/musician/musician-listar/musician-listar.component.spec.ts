/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MusicianListarComponent } from './musician-listar.component';
import {MusicianService} from '../musician.service';
import {MusicianDetail} from '../musicianDetail';



import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from "@angular/common/http/testing";
import * as faker from "faker";
import {Musician} from '../musician';

describe('MusicianListarComponent', () => {
  let component: MusicianListarComponent;
  let fixture: ComponentFixture<MusicianListarComponent>;
  let debug: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianListarComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should load component", () => {
    expect(component).toBeTruthy();
  })
});

describe('Measure length of components in a list', () => {
  let musicianListarComponent: MusicianListarComponent;
  let musicianService: MusicianService;
  let sampleDate: Date = new Date('1970-01-01T00:00:00-05:00');




  beforeEach(() => {
    musicianListarComponent = new MusicianListarComponent(musicianService);
  });

  it('should set instance correctly', () => {
    expect(musicianListarComponent).not.toBeNull();
  });

  it('should be no contacts if there is no data', () => {
    expect(musicianListarComponent.musicians).toBeUndefined();
  });

 it('should be an array of length one if there is an element there', () => {
    let musician: MusicianDetail = new MusicianDetail();
    musician.name = 'My musician';
    musician.image =
      'https://st.depositphotos.com/1015158/3751/v/950/depositphotos_37517485-stock-illustration-vinyl-record.jpg';
    musician.description = 'This is the description of this musician';
    musician.birthDate = sampleDate;
    musician.id = 100;
    musicianListarComponent.musicians = [];
    musicianListarComponent.musicians.push(musician);
    expect(musicianListarComponent.musicians.length).toBe(1);
  });

  it('should show details of each one of the elements in the array', () => {
    let musician: MusicianDetail = new MusicianDetail();
    musician.name = 'My musician';
    musician.image =
      'https://st.depositphotos.com/1015158/3751/v/950/depositphotos_37517485-stock-illustration-vinyl-record.jpg';
    musician.description = 'This is the description of this musician';
    musician.birthDate = sampleDate;
    musician.id = 100;
    musicianListarComponent.musicians = [];
    musicianListarComponent.musicians.push(musician);
    expect(musicianListarComponent.musicians[0].name).toBe('My musician');
    expect(musicianListarComponent.musicians[0].description).toBe(
      'This is the description of this musician'
    );
  });
});


