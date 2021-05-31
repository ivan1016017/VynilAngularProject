/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';


import { CollectorListarComponent } from './collector-listar.component';
import {CollectorService} from '../collector.service';
import {CollectorDetail} from '../collectorDetail';


import { HttpClientTestingModule } from "@angular/common/http/testing";
import * as faker from "faker";
import { Collector } from "../collector";
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

class RouterStub {
  navigate(url: string) {return url;}
}


describe('CollectorListarComponent', () => {
  let component: CollectorListarComponent;
  let fixture: ComponentFixture<CollectorListarComponent>;
  let debug: DebugElement;
  let element: HTMLElement;
  let mtcButton: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorListarComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule,MatDialogModule,],
      providers: [
        { provide: Router,      useValue: { navigate: jasmine.createSpy('navigate') }
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorListarComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    element = debug.nativeElement;
    // mtcButton = fixture.debugElement.query(By.css('button#addMusicianToCollector"')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


//   it('should route to musicianToCollector', fakeAsync(() => {
//     spyOn(component, 'onLinkMusicianToCollector');
//     let mtcButton = fixture.debugElement.nativeElement.querySelector("#addMusicianToCollector");
//     mtcButton.click();
//     tick();
//     expect(component.onLinkMusicianToCollector).toHaveBeenCalled();
//   }));
});


describe('Measure length of components in a list', () => {
  let collectorListarComponent: CollectorListarComponent;
  let collectorService: CollectorService;





  beforeEach(() => {
    collectorListarComponent = new CollectorListarComponent(collectorService);
  });

  it('should set instance correctly', () => {
    expect(collectorListarComponent).not.toBeNull();
  });

  it('should be no collectors if there is no data', () => {
    expect(collectorListarComponent.collectors).toBeUndefined();
  });

  it('should be an array of length one if there is an element there', () => {
    let collector: CollectorDetail = new CollectorDetail();
    collector.name = 'My collector';
    collector.telephone = 1234;
    collector.email = "admin@admin"
    collector.id = 100;
    collectorListarComponent.collectors = [];
    collectorListarComponent.collectors.push(collector);
    expect(collectorListarComponent.collectors.length).toBe(1);
  });

  it('should show details of each one of the elements in the array', () => {
    let collector: CollectorDetail = new CollectorDetail();
    collector.name = 'My collector';
    collector.telephone = 1234;
    collector.email = "admin@admin";
    collector.id = 100;
    collectorListarComponent.collectors = [];
    collectorListarComponent.collectors.push(collector);
    expect(collectorListarComponent.collectors[0].name).toBe('My collector');
  });
});



