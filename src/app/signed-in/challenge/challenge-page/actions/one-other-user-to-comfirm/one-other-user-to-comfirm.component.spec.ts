import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOtherUserToComfirmComponent } from './one-other-user-to-comfirm.component';

describe('OneOtherUserToComfirmComponent', () => {
  let component: OneOtherUserToComfirmComponent;
  let fixture: ComponentFixture<OneOtherUserToComfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneOtherUserToComfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneOtherUserToComfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
