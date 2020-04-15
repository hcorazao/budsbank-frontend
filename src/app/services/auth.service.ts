import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo');
    console.log("userData",userData); 
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public async setUserInfo(user: any){
    await localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email: string, password: string) {
    var data = {'email': `${email}`, 'password': `${password}`}
  
    return this.http.post(
      `${environment.apiUrl}/login`,
      data
      ).toPromise();
  }

  public forgetpassword(email: string){
    var data = {'email': `${email}`}
    return this.http.post(
      `${environment.apiUrl}/forget-business-password`,
      data
      ).toPromise();
  }

  public updateResetpassword(password: string, confirm_password: string, token: string){
    var data = {'password': `${password}`, 'confirm_password': `${confirm_password}`, 'token': `${token}`}
    return this.http.post(
      `${environment.apiUrl}/update-business-password`,
      data
      ).toPromise();
  }

  public logout() {
    localStorage.removeItem('userInfo');
  }

  public register(data: any){
    return this.http.post(`${environment.apiUrl}/register/business`, data).toPromise();
  }

  public checkEmail(email: any){
    return this.http.post(`${environment.apiUrl}/register/check-email`, email).toPromise();
  }
  
}
