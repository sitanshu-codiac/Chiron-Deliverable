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
  title = 'ASYMETRIE GLOBALE';
  columnNames = ['Axis', 'ASYMETRIE'];
  data; avg; maxValue; minValue;
  options = {
    chartArea: {
      left: '10%',
      top: '10%',
      width: '80%',
      height: '80%'
    },
    colors: ['#32b0f3'],
    legend: {
      position: 'top',
      textStyle: {
        color: 'white',
        fontSize: 16,
        bold: 'true'
      },
      alignment: 'center'
    },
    curveType: 'function',
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
  }

  ngOnDestroy() {
    this.recordsSub.unsubscribe();
  }

}
