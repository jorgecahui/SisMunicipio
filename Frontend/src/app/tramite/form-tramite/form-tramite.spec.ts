import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTramiteComponent } from './form-tramite';

describe('FormTramite', () => {
  let component: FormTramiteComponent;
  let fixture: ComponentFixture<FormTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTramiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
