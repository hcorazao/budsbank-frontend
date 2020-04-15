import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QuizService } from '../../../services/quiz/quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss']
})
export class QuizQuestionsComponent implements OnInit {

  public allQuestions = [];
  public pageSize: number = 10;
  public pageNumber: number = 0;

  constructor(
  	private quizService: QuizService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.getAllQuestions(this.pageNumber, this.pageSize);
  }

  getAllQuestions(pageNumber: number, pageSize: number){
		this.quizService.getAllQuestions(pageNumber, pageSize).then( response => { 
			console.log(response);
			if (response['status'] === 200){
        if (response['data'].length > 0){
          this.allQuestions = response['data'];
          console.log(this.allQuestions);
        }else{
          this.allQuestions = null;
        }
			}else{
        if (this.pageNumber !== 0){
          this.pageNumber = this.pageNumber - 10;
        }
			}
    	})
  }

   loadNextResults(){
    var pageNumber = this.pageNumber + 10; 
    this.pageNumber = pageNumber;  
    this.getAllQuestions(pageNumber, this.pageSize);
  }

  loadPrevResults(){ 
    if (this.pageNumber !== 0){
      var pageNumber = this.pageNumber - 10;    
      this.pageNumber = pageNumber;
      if (pageNumber >= 0 && this.pageSize >= 0){
        this.getAllQuestions(pageNumber, this.pageSize);
      }
    }else{
      swal.fire({
        icon: "error",
        title: "error",
        text: "No more records available"
      })
    }
  }

  viewQuestionDetail(quesId: any) {
    this.router.navigateByUrl(`admin/quiz/${quesId}`);
  }

}
