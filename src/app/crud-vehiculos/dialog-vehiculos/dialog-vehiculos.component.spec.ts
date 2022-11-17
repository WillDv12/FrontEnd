import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVehiculosComponent } from './dialog-vehiculos.component';

describe('DialogVehiculosComponent', () => {
  let component: DialogVehiculosComponent;
  let fixture: ComponentFixture<DialogVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
