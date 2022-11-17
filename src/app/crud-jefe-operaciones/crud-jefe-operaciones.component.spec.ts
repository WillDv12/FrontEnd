import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudJefeOperacionesComponent } from './crud-jefe-operaciones.component';

describe('CrudJefeOperacionesComponent', () => {
  let component: CrudJefeOperacionesComponent;
  let fixture: ComponentFixture<CrudJefeOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudJefeOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudJefeOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
