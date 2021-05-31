/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { PrizeListComponent } from './prize-list.component';
import {PrizeService} from '../prize.service';

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Prize } from "../prize";
import * as faker from 'faker';
import { Observable, of } from 'rxjs';

class MockPrizeService {
  getPrizes(): Observable<Array<Prize>> {
    let testPrizes: Array<Prize>;
    testPrizes = [];
    let testPrize: Prize;
    testPrize = new Prize();
    testPrize.id = 99,
    testPrize.name = 'Test Prize',
    testPrize.organization = 'Test Organization',
    testPrize.description = 'Test Description';
    testPrizes.push(testPrize);
    return of(testPrizes);
  }
}


describe('PrizeListComponent', () => {
  let component: PrizeListComponent;
  let fixture: ComponentFixture<PrizeListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeListComponent ],
      imports: [HttpClientTestingModule],
      providers: [ { provide: PrizeService, useClass: MockPrizeService} ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(PrizeListComponent);
    component = fixture.componentInstance;
    spyOn(component, 'onSelected');
    fixture.detectChanges();
  });


  it('should create  component', () => {
    expect(component).toBeTruthy();
  });

  it('should use getPrizes', () => {
    // const prizeService = fixture.debugElement.injector.get(PrizeService);
    fixture.detectChanges();
    let prizeService = TestBed.inject(PrizeService);

  })


  // it('should be called selected Prize', () => {
  //   let prize1: PrizeDetail = new PrizeDetail();
  //   prize1.name = 'My prize';
  //   prize1.organization = "The Berkeley Organization of Music";
  //   prize1.description = 'This is the description of this prize';
  //   prize1.id = 100;
  //   component.prizes = [];
  //   component.prizes.push(prize1);
  //   let prize2: PrizeDetail = new PrizeDetail();
  //   prize2.name = 'My prize';
  //   prize2.organization = "The Berkeley Organization of Music"
  //   prize2.description = 'This is the description of this prize';
  //   prize2.id = 101;
  //   component.prizes.push(prize2);
  //   component.selectedPrize = prize2;
  //   expect(component.onSelected).toHaveBeenCalled();
  // })
  // it('should use getAlbums from albumService', () => {
  //   const albumService = fixture.debugElement.injector.get(AlbumService);
  //   fixture.detectChanges();
  //   expect(albumService.getAlbums()).toEqual(component.collectorDetail);
  // });

});




// describe('Component is initialized', () => {
//   let component: PrizeListComponent;
//   let fixture: ComponentFixture<PrizeListComponent>;
//   let debug: DebugElement;

//   let prizeListarComponent: PrizeListComponent;
//   let prizeService: PrizeService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [PrizeListComponent],
//         providers: [
//           {provide: PrizeService, useValue: {} }
//         ]
//       })
//       .compileComponents();

//     TestBed.compileComponents();
//     fixture = TestBed.createComponent(PrizeListComponent);
//     component = fixture.componentInstance;
//   }));

//   it('initializes the component', fakeAsync(() => {
//     let service = TestBed.get(PrizeService);
//     service.get = () => {
//         return Promise.resolve();
//       };
//     component.ngOnInit();
//     tick();
//     expect(service.get.toHaveBeenCalled);

//   }))
// });



describe('Measure length of components in a list', () => {
  let prizeListarComponent: PrizeListComponent;
  let prizeService: PrizeService;

  beforeEach(() => {
    prizeListarComponent = new PrizeListComponent(prizeService);
  });

  it('should set instance correctly', () => {
    expect(prizeListarComponent).not.toBeNull();
  });

  it('should be no contacts if there is no data', () => {
    expect(prizeListarComponent.prizes).toBeUndefined();
  });

  it('should be an array of length one if there is an element there', () => {
    let prize: Prize = new Prize();
    prize.name = 'My prize';
    prize.organization = "The Berkeley Organization of Music";
    prize.description = 'This is the description of this prize';
    prize.id = 100;
    prizeListarComponent.prizes = [];
    prizeListarComponent.prizes.push(prize);
    expect(prizeListarComponent.prizes.length).toBe(1);
  });

  it('should show details of each one of the elements in the array', () => {
    let prize: Prize = new Prize();
    prize.name = 'My prize';
    prize.organization = "The Berkeley Organization of Music";
    prize.description = 'This is the description of this prize';
    prize.id = 100;
    prizeListarComponent.prizes = [];
    prizeListarComponent.prizes.push(prize);
    expect(prizeListarComponent.prizes[0].name).toBe('My prize');
    expect(prizeListarComponent.prizes[0].description).toBe(
      'This is the description of this prize');
    });

  it('should post new prize', () => {
      let prize: Prize = new Prize();
      prize.name = 'My prize';
      prize.organization = "The Berkeley Organization of Music"
      prize.description = 'This is the description of this prize';
      prize.id = 100;
      prizeListarComponent.prizes = [];
      prizeListarComponent.prizes.push(prize);
      expect(prizeListarComponent.prizes.length).toBe(1);
    });
  })
