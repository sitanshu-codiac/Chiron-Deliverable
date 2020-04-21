import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplosiviteChartComponent } from './explosivite-chart.component';

describe('ExplosiviteChartComponent', () => {
  let component: ExplosiviteChartComponent;
  let fixture: ComponentFixture<ExplosiviteChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplosiviteChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplosiviteChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
