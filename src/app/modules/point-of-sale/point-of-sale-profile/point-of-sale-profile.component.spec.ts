import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfSaleProfileComponent } from './point-of-sale-profile.component';

describe('PointOfSaleProfileComponent', () => {
  let component: PointOfSaleProfileComponent;
  let fixture: ComponentFixture<PointOfSaleProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointOfSaleProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointOfSaleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
