import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DispensariesService {

  constructor(private http: HttpClient) { }

  public addDispensary(data: any){
    return this.http.post(`${environment.apiUrl}/dispensary/add`, data).toPromise();
  }

  public getActiveDispensaries(pageNumber: any, pageSize: any, userID: any){
    return this.http.get(`${environment.apiUrl}/dispensary/all?page=${pageNumber}&size=${pageSize}&userID=${userID}`).toPromise();
  }

  public disableDispensary(data: any){
    return this.http.post(`${environment.apiUrl}/dispensary/disable`, data).toPromise();
  }

  public getDisabledDispensaries(pageNumber: any, pageSize: any, userID: any){
    return this.http.get(`${environment.apiUrl}/dispensary/disabled/all?page=${pageNumber}&size=${pageSize}&userID=${userID}`).toPromise();
  }

  public activateDispensary(data: any){
    return this.http.post(`${environment.apiUrl}/dispensary/activate`, data).toPromise();
  }

  public getDispensaryById(dispensaryId: any){
    return this.http.get(`${environment.apiUrl}/dispensary/${dispensaryId}`).toPromise();
  }

  public updateDispensary(data: any){
    return this.http.post(`${environment.apiUrl}/dispensary/update`, data).toPromise();
  }

  public getActiveDispensariesWithoutPagination(){
    return this.http.get(`${environment.apiUrl}/dispensary/active/all/without-pagination`).toPromise();
  }

  public getAdminDispensary(){
    let admin = JSON.parse(localStorage.getItem('userInfo'));
    return this.http.get(`${environment.apiUrl}/dispensary/admin/${admin.id}`).toPromise();
  }
}
