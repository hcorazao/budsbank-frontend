import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { 

  }

  public processPayment(payment: any){
  	console.log('-----------');
  	console.log('dfdfdfd');
  	console.log('-----------');
    return this.http.post(`${environment.apiUrl}/process-payment`, payment).toPromise();
  }
}
