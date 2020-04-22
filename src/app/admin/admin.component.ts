import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetChartService } from './get-chart.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartData } from './chart-data.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  isFetching = false;
  records: ChartData[] = [];
  private recordsSub: Subscription;

  type = 'ColumnChart';
  title = 'AMPLITUDE';
  data;
  height = '280';
  width = '480';
  columnNames = ['Browser', 'Amplitude'];
  option1 = {
    chartArea: {
      left: '10%',
      top: '10%',
      width: '80%',
      height: '80%'
    },
    legend: 'none',
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

  option2 = {
    chartArea: {
      left: '10%',
      top: '10%',
      width: '80%',
      height: '80%',
    },
    curveType: 'function',
    legend: 'none',
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

  type3 = 'ColumnChart';
  option3 = {
    chartArea: {
      left: '10%',
      top: '10%',
      width: '80%',
      height: '80%',
    },
    isStacked: true,
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

  titleChart = 'ASYMMETRY';
  typeOfChart = 'LineChart';
  ExplosiviteTitle = 'EXPLOSIVITE';
  dataOfChart;
  data3;
  data4;
  avg;

  constructor(private chartService: GetChartService) { }

  ngOnInit() {
    this.isFetching = true;
    this.chartService.getChartData();
    this.isFetching = false;
    this.recordsSub = this.chartService.getRecordsUpdateListener()
      .pipe(
        map(responseData => {
          for (const key of responseData) {
            console.log(key.phaseChart);
            this.data = key.amplitudeChart;
            this.dataOfChart = key.symmetryChart;
            this.data3 = key.phaseChart;
            this.data4 = key.explosiviteChart;
          }
          let sum = 0;
          for (const key of this.data) {
            sum += key[1];
          }
          let av = sum / this.data.length;
          this.avg = av.toPrecision(4);
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
