import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QuizService } from '../../../services/quiz/quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {

  public questionID: any;
  public questionData: [];

  constructor(
  	private quizService: QuizService,
  	private spinner: NgxSpinnerService,
    private currentRoute: ActivatedRoute
  	) { }

  ngOnInit() {
    this.currentRoute.params.subscribe(params => {
      this.quizService.getQuestionsbyID(params.id).then(response => { 
        //console.log(params.id);
        if (response['status'] === 200){
            this.questionData = response['data'];
            console.log(this.questionData);
        }else{
          console.log(response);
          swal.fire('Error', 'Question Not Found', 'error');
        }
      });
    });
  }

}
