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

  constructor(private chartService: GetChartService) { }

  ngOnInit() {
    this.isFetching = true;
    this.chartService.getChartData();
    this.recordsSub = this.chartService.getRecordsUpdateListener()
      .subscribe(records => {
        this.records = records;
        this.isFetching = false;
    });
  }

  ngOnDestroy() {
    this.recordsSub.unsubscribe();
  }

}
