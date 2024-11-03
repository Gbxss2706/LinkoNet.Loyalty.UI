import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePosComponent } from './create-pos.component';

describe('CreatePosComponent', () => {
  let component: CreatePosComponent;
  let fixture: ComponentFixture<CreatePosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
