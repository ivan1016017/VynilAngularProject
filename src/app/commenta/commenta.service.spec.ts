/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentaService } from './commenta.service';

describe('Service: Commenta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentaService]
    });
  });

  it('should ...', inject([CommentaService], (service: CommentaService) => {
    expect(service).toBeTruthy();
  }));
});
