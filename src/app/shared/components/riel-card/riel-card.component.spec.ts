/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RielCardComponent } from './riel-card.component';

describe('RielCardComponent', () => {
  let component: RielCardComponent;
  let fixture: ComponentFixture<RielCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RielCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RielCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
