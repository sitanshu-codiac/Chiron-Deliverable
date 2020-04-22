import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartData } from '../chart-data.model';
import { Subscription } from 'rxjs';
import { GetChartService } from '../get-chart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-phase-chart',
  templateUrl: './phase-chart.component.html',
  styleUrls: ['./phase-chart.component.css']
})
export class PhaseChartComponent implements OnInit, OnDestroy {

  isFetching = false;
  records: ChartData[] = [];
  private recordsSub: Subscription;

  type = 'ColumnChart';
  columnNames = ['Axis', 'PHASE CONCENTRIQUE', 'PHASE ISOMETRIQUE', 'PHASE EXCENTRIQUE'];
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
    isStacked: true,
    colors: ['red', 'white', '#00ff00'],
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
            this.data = key.phaseChart;
          }
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
