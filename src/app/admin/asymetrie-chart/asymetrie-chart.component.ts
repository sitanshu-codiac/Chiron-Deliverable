import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetChartService } from '../get-chart.service';
import { Subscription } from 'rxjs';
import { ChartData } from '../chart-data.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-asymetrie-chart',
  templateUrl: './asymetrie-chart.component.html',
  styleUrls: ['./asymetrie-chart.component.css']
})
export class AsymetrieChartComponent implements OnInit, OnDestroy {

  isFetching = false;
  records: ChartData[] = [];
  private recordsSub: Subscription;

  type = 'LineChart';
  columnNames = ['Axis', 'ASYMETRIE'];
  data; avg; maxValue; minValue;
  overlay = [];
  autoSaveInterval;
  counter = 0;
  options = {
    title: 'ASYMMETRY',
    titleTextStyle: {
      color: '#32b0f3',
      fontSize: 16,
      bold: true,
      italic: true
    },
    colors: ['#32b0f3'],
    legend: {
      position: 'none'
    },
    curveType: 'function',
    backgroundColor: {
      fill: 'none'
    },
    hAxis: {
      title: 'Rep.',
      titleTextStyle: {
        color: '#fff',
        fontSize: 16
      },
      gridlines: {
        color: 'none'
      },
      textStyle: {
        color: 'fff'
      }
    },
    vAxis: {
      title: '%',
      titleTextStyle: {
        color: '#fff',
        fontSize: 16
      },
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
    this.chartService.getChartData(2);
    this.recordsSub = this.chartService.getRecordsUpdateListener()
      .pipe(
        map(responseData => {
          for (const key of responseData) {
            this.data = key.symmetryChart;
          }
          let sum = 0;
          const valueArray = [];
          for (const key of this.data) {
            sum += key[1];
            valueArray.push(key[1]);
          }
          this.maxValue = Math.max(...valueArray).toPrecision(2);
          this.minValue = Math.min(...valueArray).toPrecision(2);
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
