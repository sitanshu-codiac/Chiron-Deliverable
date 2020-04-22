import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Records } from './records.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartData } from './chart-data.model';


@Injectable({providedIn: 'root'})
export class GetChartService {
  private records: ChartData[] = [];
  private recordsUpdated = new Subject<ChartData[]>();

  constructor(private http: HttpClient) {}

  getChartData() {
    this.http.get<Records[]>('http://localhost:3000/api/chart')
      .pipe(
        map(responseData => {
        console.log(responseData);
        const amplitudeArray = [];
        const symmetryArray = [];
        const explosiviteArray = [];
        const someArray = [];
        const dataTransformArray = [];
        for (const key of responseData) {
          var i = 1;
          var j = 1;
          for (const serie of key.series) {
            const weight = serie.weight;
            for ( const rep of serie.repetitions) {
              const phaseArray = [j];
              for (const phase of rep.phases) {
                if ( phase.amplitude !== 0) {
                  const amp = phase.amplitude * 100;
                  const sym = phase.symmetry * 10;
                  const ph = weight / (phase.time / 1000);
                  amplitudeArray.push([i , amp]);
                  symmetryArray.push([i , sym]);
                  explosiviteArray.push([i, ph]);
                  phaseArray.push(ph);
                  i += 1;
                } else {
                  const ph = phase.time / 1000;
                  phaseArray.push(ph);
                }
              }
              someArray.push(phaseArray);
              j += 1;
            }
          }
        }
        dataTransformArray.push(
          { amplitudeChart: amplitudeArray,
            symmetryChart: symmetryArray,
            phaseChart: someArray,
            explosiviteChart: explosiviteArray
          });
        return dataTransformArray;
      }))
      .subscribe((recordData) => {
        this.records = recordData;
        this.recordsUpdated.next([...this.records]);
    });
  }

  getRecordsUpdateListener() {
    return this.recordsUpdated.asObservable();
  }

}
