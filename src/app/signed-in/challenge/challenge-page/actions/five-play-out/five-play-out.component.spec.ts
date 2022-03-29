import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FivePlayOutComponent } from './five-play-out.component';

describe('FivePlayOutComponent', () => {
  let component: FivePlayOutComponent;
  let fixture: ComponentFixture<FivePlayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FivePlayOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FivePlayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
