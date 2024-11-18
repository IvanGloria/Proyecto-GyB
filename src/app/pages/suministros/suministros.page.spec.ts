import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuministrosPage } from './suministros.page';

describe('SuministrosPage', () => {
  let component: SuministrosPage;
  let fixture: ComponentFixture<SuministrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuministrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
