/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CollectorAlbumComponent } from './collector-album.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Album } from 'src/app/album/album';
import { AlbumService} from 'src/app/album/album.service';
import { Collector } from 'src/app/collector/collector';
import { CollectorService } from 'src/app/collector/collector.service';
import { CollectorDetail } from '../collectorDetail';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { AlbumDetail } from 'src/app/album/albumDetail';
;


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

class MockAlbumService {
  getAlbums(): Observable<Array<AlbumDetail>> {
    let testAlbums: Array<AlbumDetail>;
    testAlbums = [];
    let testAlbum: AlbumDetail;
    testAlbum = new AlbumDetail;
    testAlbum.id = 998,
    testAlbum.name = faker.lorem.word(),
    testAlbum.cover = faker.internet.url(),
    testAlbum.releaseDate = faker.date.past(),
    testAlbum.description = faker.lorem.words(4),
    testAlbum.genre = GENRE[faker.random.objectElement(GENRE)],
    testAlbum.recordLabel = RECORD_LABEL[faker.random.objectElement(RECORD_LABEL)],
    testAlbum.tracks = [],
    testAlbum.comments = [];
    testAlbums.push(testAlbum);
    return of(testAlbums);
  }
}


class MockCollectorService {
  getCollectors(): Observable<Array<CollectorDetail>> {
    let testCollectors: Array<CollectorDetail>;
    testCollectors = [];
    let testCollector: CollectorDetail;
    testCollector = new CollectorDetail();
    testCollector.id = faker.datatype.number(),
    testCollector.name = faker.lorem.word(),
    testCollector.telephone = faker.datatype.number(7),
    testCollector.email = faker.internet.email();
    testCollectors.push(testCollector);
    return of(testCollectors);
  }
}





describe('CollectorAlbumComponent', () => {
  let component: CollectorAlbumComponent;
  let fixture: ComponentFixture<CollectorAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorAlbumComponent ],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterTestingModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [ { provide: AlbumService, useClass: MockAlbumService}, { provide: CollectorService, useClass: MockCollectorService} ],
    schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.collectorForm.valid).toBeFalsy();
  })
});
