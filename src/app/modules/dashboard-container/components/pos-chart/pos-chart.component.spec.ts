import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosChartComponent } from './pos-chart.component';

describe('PosChartComponent', () => {
  let component: PosChartComponent;
  let fixture: ComponentFixture<PosChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
