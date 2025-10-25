import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTramite } from './form-tramite';

describe('FormTramite', () => {
  let component: FormTramite;
  let fixture: ComponentFixture<FormTramite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTramite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTramite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
