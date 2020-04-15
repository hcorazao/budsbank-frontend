import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public uploadQuiz(data: any){
    return this.http.post(`${environment.apiUrl}/quiz/upload`, data).toPromise();
  }

  public getAllQuiz(pageNumber: number, pageSize: number){
    return this.http.get(`${environment.apiUrl}/quiz/all?page=${pageNumber}&size=${pageSize}`).toPromise();
  }

  public getAllQuestions(pageNumber: number, pageSize: number){
    return this.http.get(`${environment.apiUrl}/quiz/group/questions?page=${pageNumber}&size=${pageSize}`).toPromise();
  }

  public getQuestionsbyID(questionID: any){
    return this.http.get(`${environment.apiUrl}/quiz/singlequestion/?questionID=${questionID}`).toPromise();
  }

  public deleteQuiz(data: any){
    return this.http.post(`${environment.apiUrl}/quiz/delete`, data).toPromise();
  }
}
