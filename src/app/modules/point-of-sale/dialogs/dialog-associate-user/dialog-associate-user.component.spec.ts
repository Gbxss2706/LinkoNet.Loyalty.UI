import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssociateUserComponent } from './dialog-associate-user.component';

describe('DialogAssociateUserComponent', () => {
  let component: DialogAssociateUserComponent;
  let fixture: ComponentFixture<DialogAssociateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAssociateUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAssociateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
