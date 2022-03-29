import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoMainUserToConfirmComponent } from './two-main-user-to-confirm.component';

describe('TwoMainUserToConfirmComponent', () => {
  let component: TwoMainUserToConfirmComponent;
  let fixture: ComponentFixture<TwoMainUserToConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoMainUserToConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoMainUserToConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
