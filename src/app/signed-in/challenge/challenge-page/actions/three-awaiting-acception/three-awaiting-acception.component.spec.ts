import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeAwaitingAcceptionComponent } from './three-awaiting-acception.component';

describe('ThreeAwaitingAcceptionComponent', () => {
  let component: ThreeAwaitingAcceptionComponent;
  let fixture: ComponentFixture<ThreeAwaitingAcceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeAwaitingAcceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeAwaitingAcceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
