import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseChartComponent } from './phase-chart.component';

describe('PhaseChartComponent', () => {
  let component: PhaseChartComponent;
  let fixture: ComponentFixture<PhaseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
