import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quincena2Component } from './quincena2.component';

describe('Quincena2Component', () => {
  let component: Quincena2Component;
  let fixture: ComponentFixture<Quincena2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quincena2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quincena2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
