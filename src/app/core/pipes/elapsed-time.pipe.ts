import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment'

@Pipe({
  name: 'elapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {

  public constructor(private httpClient: HttpClient) {}

  transform(value: Moment, ...args: any[]): Promise<string> {

    return new Promise<string>((resolve) => {
      this.httpClient.get<any>(
        'http://worldclockapi.com/api/json/utc/now'
      ).subscribe((response: any) => {
        const now: Moment = moment(response.currentDateTime)
        
        let elapsedTime: string

        if (now.diff(value, 'd') > 1) {
          elapsedTime = `Il y a plus d'un jour`
        } else if (now.diff(value, 'h') > 1) {
          elapsedTime = `Il y a plus d'une heure`
        } else if (now.diff(value, 'm') > 1 ) {
          elapsedTime = `Il y a quelques minutes`
        } else {
          elapsedTime = `Il y a quelques secondes`
        }

        // Take your promise (always !)
        resolve(elapsedTime)
      }, (error) => {
        resolve('Data not available')
      })
    })
  }

}
