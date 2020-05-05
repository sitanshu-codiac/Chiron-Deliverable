import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Records } from './records.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartData } from './chart-data.model';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class GetChartService {
  private records: ChartData[] = [];
  user;
  private recordsUpdated = new Subject<ChartData[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getChartData(exerciseID) {
    this.user = this.authService.getUserDetails();
    const queryParams = `?uID=${this.user.uID}&exID=${exerciseID}`;
    this.http.get<Records[]>('http://localhost:3000/api/chart' + queryParams)
      .pipe(
        map(responseData => {
        console.log(responseData);
        const recordData = [];
        recordData.push(responseData);
        const amplitudeArray = [];
        const symmetryArray = [];
        const explosiviteArray = [];
        const phaseArray = [];
        const transformedData = [];
        for (const key of recordData) {
          var i = 1;
          var j = 1;
          for (const serie of key.series) {
            const weight = serie.weight + this.user.weight;
            for ( const rep of serie.repetitions) {
              const minorArray = [j];
              for (const phase of rep.phases) {
                if ( phase.amplitude !== 0) {
                  const amp = phase.amplitude * 100;
                  const sym = phase.symmetry * 10;
                  const exp = weight / (phase.time / 1000);
                  const pha = phase.time / 1000;
                  amplitudeArray.push([i , amp]);
                  symmetryArray.push([i , sym]);
                  explosiviteArray.push([i, exp]);
                  minorArray.push(pha);
                  i += 1;
                } else {
                  const ph = phase.time / 1000;
                  minorArray.push(ph);
                }
              }
              phaseArray.push(minorArray);
              j += 1;
            }
          }
        }
        transformedData.push(
          { amplitudeChart: amplitudeArray,
            symmetryChart: symmetryArray,
            phaseChart: phaseArray,
            explosiviteChart: explosiviteArray
          });
        return transformedData;
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
