import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesList } from './tramites-list';

describe('TramitesList', () => {
  let component: TramitesList;
  let fixture: ComponentFixture<TramitesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramitesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramitesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
