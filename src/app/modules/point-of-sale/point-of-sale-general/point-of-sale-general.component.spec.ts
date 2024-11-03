import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfSaleGeneralComponent } from './point-of-sale-general.component';

describe('PointOfSaleGeneralComponent', () => {
  let component: PointOfSaleGeneralComponent;
  let fixture: ComponentFixture<PointOfSaleGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointOfSaleGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointOfSaleGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
