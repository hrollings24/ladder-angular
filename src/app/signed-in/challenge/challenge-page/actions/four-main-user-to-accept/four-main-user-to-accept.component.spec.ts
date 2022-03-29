import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourMainUserToAcceptComponent } from './four-main-user-to-accept.component';

describe('FourMainUserToAcceptComponent', () => {
  let component: FourMainUserToAcceptComponent;
  let fixture: ComponentFixture<FourMainUserToAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourMainUserToAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourMainUserToAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
