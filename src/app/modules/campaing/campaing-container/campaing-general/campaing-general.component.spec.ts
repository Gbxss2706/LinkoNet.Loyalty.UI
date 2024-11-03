import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingGeneralComponent } from './campaing-general.component';

describe('CampaingGeneralComponent', () => {
  let component: CampaingGeneralComponent;
  let fixture: ComponentFixture<CampaingGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaingGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaingGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
