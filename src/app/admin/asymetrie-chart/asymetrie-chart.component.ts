import { Component, OnInit, OnDestroy } from '@angular/core';
import { Records } from '../records.model';
import { GetChartService } from '../get-chart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asymetrie-chart',
  templateUrl: './asymetrie-chart.component.html',
  styleUrls: ['./asymetrie-chart.component.css']
})
export class AsymetrieChartComponent implements OnInit, OnDestroy {
  isFetching = false;
  records: Records[] = [];
  private recordsSub: Subscription;

  type = 'LineChart';
  data;
  columnNames = ['Browser', 'Percentage'];
  width = 550;
  height = 280;

  constructor(private chartService: GetChartService) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.recordsSub.unsubscribe();
  }

}
