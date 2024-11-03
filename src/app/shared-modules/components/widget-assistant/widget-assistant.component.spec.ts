import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAssistantComponent } from './widget-assistant.component';

describe('WidgetAssistantComponent', () => {
  let component: WidgetAssistantComponent;
  let fixture: ComponentFixture<WidgetAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetAssistantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
