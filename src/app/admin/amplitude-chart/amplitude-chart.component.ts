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
  data;
  avg;
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
    colors: ['#00ff00'],
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
          for (const key of this.data) {
            sum += key[1];
          }
          const average = sum / this.data.length;
          this.avg = average.toPrecision(4);
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
