import { Component, OnInit, OnDestroy } from '@angular/core';
import { Records } from '../records.model';
import { Subscription } from 'rxjs';
import { GetChartService } from '../get-chart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-amplitude-chart',
  templateUrl: './amplitude-chart.component.html',
  styleUrls: ['./amplitude-chart.component.css']
})
export class AmplitudeChartComponent implements OnInit, OnDestroy {

  isFetching = false;
  records: Records[] = [];
  private recordsSub: Subscription;

  type = 'ColumnChart';
  data;
  columnNames = ['Browser', 'Percentage'];
  width = 550;
  height = 280;

  typeOfChart = 'LineChart';
  dataOfChart = [
    ['2010', 10],
    ['2020', 20],
    ['2030', 50]
  ];

  constructor(private chartService: GetChartService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.recordsSub.unsubscribe();
  }

}
