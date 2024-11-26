import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProyectosAddPage } from './proyectos-add.page';

describe('ProyectosAddPage', () => {
  let component: ProyectosAddPage;
  let fixture: ComponentFixture<ProyectosAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
