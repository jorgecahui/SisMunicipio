import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTramiteComponent } from './register-tramite';

describe('RegisterTramiteComponent', () => {
  let component: RegisterTramiteComponent;
  let fixture: ComponentFixture<RegisterTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTramiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
