import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplitudeChartComponent } from './amplitude-chart.component';

describe('AmplitudeChartComponent', () => {
  let component: AmplitudeChartComponent;
  let fixture: ComponentFixture<AmplitudeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmplitudeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmplitudeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
