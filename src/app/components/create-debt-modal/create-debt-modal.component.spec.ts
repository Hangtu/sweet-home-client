import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebtModalComponent } from './create-debt-modal.component';

describe('CreateDebtModalComponent', () => {
  let component: CreateDebtModalComponent;
  let fixture: ComponentFixture<CreateDebtModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDebtModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDebtModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
