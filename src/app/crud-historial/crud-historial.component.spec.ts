import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudHistorialComponent } from './crud-historial.component';

describe('CrudHistorialComponent', () => {
  let component: CrudHistorialComponent;
  let fixture: ComponentFixture<CrudHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudHistorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
