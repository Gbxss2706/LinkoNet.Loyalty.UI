import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersChartComponent } from './registers-chart.component';

describe('RegistersChartComponent', () => {
  let component: RegistersChartComponent;
  let fixture: ComponentFixture<RegistersChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistersChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
