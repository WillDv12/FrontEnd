import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJefeOperacionesComponent } from './dialog-jefe-operaciones.component';

describe('DialogJefeOperacionesComponent', () => {
  let component: DialogJefeOperacionesComponent;
  let fixture: ComponentFixture<DialogJefeOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogJefeOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogJefeOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
