import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrabajadoresAddPage } from './trabajadores-add.page';

describe('TrabajadoresAddPage', () => {
  let component: TrabajadoresAddPage;
  let fixture: ComponentFixture<TrabajadoresAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
