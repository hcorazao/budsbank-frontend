import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  public register(user: any){
    var setHeaders = new HttpHeaders().set("Authorization", "Basic " + environment.authorizationSecret);
    const httpOptions = {
      headers: setHeaders
    };
      
    return this.http.post(`${environment.apiUrl}/user/add`, user, httpOptions).toPromise();
  }

  public getActiveUsers(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.apiUrl}/user/all?page=${pageNumber}&size=${pageSize}`).toPromise();
  }

  public getUserById(userId: any){
    return this.http.get(`${environment.apiUrl}/user/${userId}`).toPromise();
  }

  public update(user: any){
    return this.http.post(`${environment.apiUrl}/user/update/profile`, user).toPromise();
  }

  public disableUser(data: any){
    return this.http.post(`${environment.apiUrl}/user/disable`, data).toPromise();
  }

  public getDisabledUsers(pageNumber: number, pageSize: number){
    return this.http.get(`${environment.apiUrl}/user/disabled/all?page=${pageNumber}&size=${pageSize}`).toPromise();
  }

  public activateUser(data: any){
    return this.http.post(`${environment.apiUrl}/user/activate`, data).toPromise();
  }

  public getDashboradData(userID: any){
    return this.http.get(`${environment.apiUrl}/dashboard/data?userID=${userID}`).toPromise();
  }

  public updateAdminPassword(data: any){
    return this.http.post(`${environment.apiUrl}/profile/password/update`, data).toPromise();
  }

  public updateAdminProfile(data: any){
    return this.http.post(`${environment.apiUrl}/profile/update`, data).toPromise();
  }

  public getAdminProfile(id: any){
    return this.http.get(`${environment.apiUrl}/${id}`).toPromise();
  }

}
