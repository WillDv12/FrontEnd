import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSedesComponent } from './crud-sedes.component';

describe('CrudSedesComponent', () => {
  let component: CrudSedesComponent;
  let fixture: ComponentFixture<CrudSedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudSedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
