import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartData } from '../chart-data.model';
import { Subscription } from 'rxjs';
import { GetChartService } from '../get-chart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-explosivite-chart',
  templateUrl: './explosivite-chart.component.html',
  styleUrls: ['./explosivite-chart.component.css']
})
export class ExplosiviteChartComponent implements OnInit, OnDestroy {
  isFetching = false;
  records: ChartData[] = [];
  private recordsSub: Subscription;

  type = 'LineChart';
  title = 'EXPLOSIVITE GLOBALE';
  columnNames = ['Axis', 'EXPLOSIVITE'];
  data; avg; maxValue; minValue;
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
    curveType: 'function',
    colors: ['#d0fa02'],
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
            this.data = key.explosiviteChart;
          }
          let sum = 0;
          for (const key of this.data) {
            sum += key[1];
          }
          const valueArray = [];
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
