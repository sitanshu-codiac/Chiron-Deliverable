import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsymetrieChartComponent } from './asymetrie-chart.component';

describe('AsymetrieChartComponent', () => {
  let component: AsymetrieChartComponent;
  let fixture: ComponentFixture<AsymetrieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsymetrieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsymetrieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
