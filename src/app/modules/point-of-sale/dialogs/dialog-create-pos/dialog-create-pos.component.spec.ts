import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreatePosComponent } from './dialog-create-pos.component';

describe('DialogCreatePosComponent', () => {
  let component: DialogCreatePosComponent;
  let fixture: ComponentFixture<DialogCreatePosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreatePosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCreatePosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
