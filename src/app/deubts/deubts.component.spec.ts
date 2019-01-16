import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeubtsComponent } from './deubts.component';

describe('DeubtsComponent', () => {
  let component: DeubtsComponent;
  let fixture: ComponentFixture<DeubtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeubtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeubtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
