import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoModalComponent } from './medicamento-modal.component';

describe('MedicamentoModalComponent', () => {
  let component: MedicamentoModalComponent;
  let fixture: ComponentFixture<MedicamentoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
