import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient) { }


  public getVoucher(pageNumber: number, pageSize: number){
    //return this.http.post(`${environment.apiUrl}/voucher/getall?page=${pageNumber}&size=${pageSize}`).toPromise();
    return this.http.get(`${environment.apiUrl}/voucher/getall/?page=${pageNumber}&size=${pageSize}`).toPromise();
  }
}
