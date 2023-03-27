import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmatchesComponent } from './allmatches.component';

describe('AllmatchesComponent', () => {
  let component: AllmatchesComponent;
  let fixture: ComponentFixture<AllmatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllmatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
