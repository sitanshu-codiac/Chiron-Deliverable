import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { GetChartService } from './get-chart.service';
import { Subscription } from 'rxjs';
import { ChartData } from './chart-data.model';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  isFetching = false;
  currentView = 'bars';
  records: ChartData[] = [];
  user;
  exercise;
  @Output() exerciseID = new EventEmitter();
  private recordsSub: Subscription;
  exerciseList = [
    {value: '4', viewValue: 'Squats'},
    {value: '5', viewValue: 'Plank'},
    {value: '2', viewValue: 'Pull Ups'},
    {value: '1', viewValue: 'Exercise 4'}
  ];
  asymValue; asyAttribute;

  constructor(private chartService: GetChartService, private authService: AuthService) { }

  ngOnInit() {
    this.isFetching = true;
    this.chartService.getChartData(2);
    this.recordsSub = this.chartService.getRecordsUpdateListener()
    .pipe(
      map(responseData => {
        let data = [];
        for (const key of responseData) {
          data = key.symmetryChart;
        }
        let sum = 0;
        for (const key of data) {
          sum += key[1];
        }
        const average = sum / data.length;
        this.asymValue = average.toPrecision(4);
        if (average >= 0 && average < 2) {
          this.asyAttribute = 'low';
        } else if (average >= 2 && average < 4) {
          this.asyAttribute = 'medium';
        } else {
          this.asyAttribute = 'high';
        }
        return responseData;
      })
    )
    .subscribe(records => {
      this.records = records;
      this.isFetching = false;
    });
    this.user = this.authService.getUserDetails();
  }

  changeView(view) {
    this.currentView = view;
  }

  filterExercise(ctrl) {
    this.isFetching = true;
    this.chartService.getChartData(ctrl);
    this.recordsSub = this.chartService.getRecordsUpdateListener()
    .pipe(
      map(responseData => {
        let data = [];
        for (const key of responseData) {
          data = key.amplitudeChart;
        }
        this.exerciseID.emit(data);
        return responseData;
      })
    )
    .subscribe(records => {
      this.records = records;
      this.isFetching = false;
    });
  }

  ngOnDestroy() {
    this.recordsSub.unsubscribe();
  }

}
