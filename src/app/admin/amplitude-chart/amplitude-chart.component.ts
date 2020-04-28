import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetChartService } from '../get-chart.service';
import { map } from 'rxjs/operators';
import { ChartData } from '../chart-data.model';

@Component({
  selector: 'app-amplitude-chart',
  templateUrl: './amplitude-chart.component.html',
  styleUrls: ['./amplitude-chart.component.css']
})
export class AmplitudeChartComponent implements OnInit, OnDestroy {

  isFetching = false;
  records: ChartData[] = [];
  private recordsSub: Subscription;

  type = 'ColumnChart';
  title = 'AMPLITUDE';
  columnNames = ['Axis', 'AMPLITUDE'];
  data; avg; maxValue; minValue;

  overlay = [];
  autoSaveInterval;
  counter = 0;

  options = {
    chartArea: {
      left: '10%',
      top: '10%',
      width: '80%',
      height: '80%'
    },
    legend: {
      position: 'top',
      textStyle: {
        color: 'white',
        fontSize: 16,
        bold: 'true'
      },
      alignment: 'center'
    },
    colors: ['#2ace9a'],
    titleTextStyle: {
      color: 'fff',
      fontSize: 16
    },
    backgroundColor: {
      fill: 'none'
    },
    hAxis: {
      gridlines: {
        color: 'none'
      },
      textStyle: {
        color: 'fff'
      }
    },
    vAxis: {
      gridlines: {
        color: 'none'
      },
      textStyle: {
        color: 'fff'
      }
    }
  };

  constructor(private chartService: GetChartService) { }

  ngOnInit() {
    this.isFetching = true;
    this.chartService.getChartData();
    this.recordsSub = this.chartService.getRecordsUpdateListener()
      .pipe(
        map(responseData => {
          for (const key of responseData) {
            this.data = key.amplitudeChart;
          }
          let sum = 0;
          const valueArray = [];
          for (const key of this.data) {
            sum += key[1];
            valueArray.push(key[1]);
          }
          this.maxValue = Math.max(...valueArray).toPrecision(4);
          this.minValue = Math.min(...valueArray).toPrecision(4);
          const average = sum / this.data.length;
          this.avg = average.toPrecision(4);
          return responseData;
        })
      )
      .subscribe(records => {
        this.records = records;
        this.isFetching = false;
    });
    setInterval(() => this.change(), 3000 );
  }

  change() {
    this.overlay.push('Avg: ' + this.avg);
    this.overlay.push(`Max: ${this.maxValue}`);
    this.autoSaveInterval = this.overlay[this.counter];
    this.counter++;
    if (this.counter >= this.overlay.length) {
      this.counter = 0;
      // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
    }
  }

  ngOnDestroy() {
    this.recordsSub.unsubscribe();
  }

}
