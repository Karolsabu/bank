import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelteComponent } from './delte.component';

describe('DelteComponent', () => {
  let component: DelteComponent;
  let fixture: ComponentFixture<DelteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelteComponent]
    });
    fixture = TestBed.createComponent(DelteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
