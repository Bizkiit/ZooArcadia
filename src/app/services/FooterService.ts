import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Footer } from '../../models/footer-model';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private footerDataSubject = new BehaviorSubject<Footer | null>(null);
  footerData$ = this.footerDataSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadFooterData();
  }

  public loadFooterData() {
    this.apiService.get<Footer>('footer').subscribe(data => {
      this.footerDataSubject.next(data);
    });
  }

  updateFooterData(newData: Footer): Observable<Footer> {
    return this.apiService.post<Footer>('footer', newData, true);
  }

  getFooterData(): Footer | null {
    return this.footerDataSubject.value;
  }
}
