import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Capital } from './capital';

@Injectable({
  providedIn: 'root',
})
export class CapitalService {
  next(capital: Capital) {
    throw new Error('Method not implemented.');
  }
  private url = 'http://localhost:5200';
  private capitals$: Subject<Capital[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshCapitals() {
    this.httpClient.get<Capital[]>(`${this.url}/quiz`).subscribe((capitals) => {
      this.capitals$.next(capitals);
    });
  }
  getCapitals(): Subject<Capital[]> {
    this.refreshCapitals();
    return this.capitals$;
  }
}
