import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetChartService } from './get-chart.service';
import { Subscription } from 'rxjs';
import { ChartData } from './chart-data.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  isFetching = false;
  records: ChartData[] = [];
  user;
  private recordsSub: Subscription;

  constructor(private chartService: GetChartService, private authService: AuthService) { }

  ngOnInit() {
    this.isFetching = true;
    this.chartService.getChartData();
    this.recordsSub = this.chartService.getRecordsUpdateListener()
      .subscribe(records => {
        this.records = records;
        this.isFetching = false;
    });
    this.user = this.authService.getUserDetails();
  }

  ngOnDestroy() {
    this.recordsSub.unsubscribe();
  }

}
