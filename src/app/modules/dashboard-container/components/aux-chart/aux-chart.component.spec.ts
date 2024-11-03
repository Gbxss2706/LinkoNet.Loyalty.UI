import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxChartComponent } from './aux-chart.component';

describe('AuxChartComponent', () => {
  let component: AuxChartComponent;
  let fixture: ComponentFixture<AuxChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuxChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
