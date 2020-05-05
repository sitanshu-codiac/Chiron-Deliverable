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
  data; avgPhaseConc; avgPhaseIso; avgPhaseExp;
  options1 = {
    isStacked: true
  }
  options = {
    title: 'PHASE TIME (sec.)',
    titleTextStyle: {
      color: '#838583',
      fontSize: 16,
      bold: true,
      italic: true
    },
    legend: {position: 'none'},
    isStacked: true,
    colors: ['#f23c50', '#ffffff', '#2ace9a'],
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
      title: 'sec',
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
            this.data = key.phaseChart;
          }
          let sumConc = 0;
          let sumIso = 0;
          let sumExp = 0;
          for (const key of this.data) {
            sumConc += key[1];
            sumIso += key[2];
            sumExp += key[3];
          }
          const averageConc = sumConc / this.data.length;
          const averageIso = sumIso / this.data.length;
          const averageExp = sumExp / this.data.length;
          this.avgPhaseConc = averageConc.toPrecision(4);
          this.avgPhaseIso = averageIso.toPrecision(4);
          this.avgPhaseExp = averageExp.toPrecision(4);
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
