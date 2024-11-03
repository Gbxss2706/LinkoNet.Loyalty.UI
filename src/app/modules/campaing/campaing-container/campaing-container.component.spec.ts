import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingContainerComponent } from './campaing-container.component';

describe('CampaingContainerComponent', () => {
  let component: CampaingContainerComponent;
  let fixture: ComponentFixture<CampaingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaingContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
