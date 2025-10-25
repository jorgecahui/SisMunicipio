import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TramiteService } from './tramite';

describe('TramiteService', () => {
  let service: TramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TramiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
