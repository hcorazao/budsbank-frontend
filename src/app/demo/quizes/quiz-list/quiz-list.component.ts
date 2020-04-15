import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QuizService } from '../../../services/quiz/quiz.service';
import { DispensariesService } from '../../../services/dispensaries/dispensaries.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizes = [];
  public pageSize: number = 10;
  public pageNumber: number = 0;

  constructor(
    private quizService: QuizService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAvailableQuiz(this.pageNumber, this.pageSize);
  }

  getAvailableQuiz(pageNumber: number, pageSize: number){ console.log(pageNumber); console.log(pageSize);
    this.quizService.getAllQuiz(pageNumber, pageSize).then( response => { console.log(response);
      if (response['status'] === 200){
        var tempArray = [];
        response['data'].forEach( element => {
          var data = {
            'group_id': element.group_id,
            'created_at': this.formatDate(element.created_at)
          }
          tempArray.push(data);
          this.quizes = tempArray;
        });
      }else{
        if (this.quizes.length )
        if (this.pageNumber !== 0){
          this.pageNumber = this.pageNumber - 10;
        }else{
          this.quizes = [];
        }
        // swal.fire({
        //   icon: "error",
        //   title: "error",
        //   text: "No more records available"
        // })
      }
      
      console.log(this.quizes);
    })
  }

  formatDate(date: any) {
    var newDate = new Date(date);
    let month = "" + (newDate.getMonth() + 1);
    let day =   "" + newDate.getDate();
    let year = newDate.getFullYear(); 
    
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("-");
  }

  showWarningPopup(quizId: any){
    swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Are you sure you want to delete these question?",
      showCancelButton: true,
    }).then((response)=>{
      if (response.value){
        this.deleteQuiz(quizId);
      }
    });
  }

  deleteQuiz(quizId){
    var data = {
      'quiz_id': quizId
    }
    this.quizService.deleteQuiz(data).then( response => {
      if (response['status'] === 200){
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Questions Deleted Successfully",
        })
      }else{
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Internal Server Error"
        })
      }
      this.getAvailableQuiz(this.pageNumber, this.pageSize);
    })
  }

  loadNextResults(){
    var pageNumber = this.pageNumber + 10; 
    this.pageNumber = pageNumber;  
    this.getAvailableQuiz(pageNumber, this.pageSize);
  }

  loadPrevResults(){ 
    if (this.pageNumber !== 0){
      var pageNumber = this.pageNumber - 10;    
      this.pageNumber = pageNumber;
      if (pageNumber >= 0 && this.pageSize >= 0){
        this.getAvailableQuiz(pageNumber, this.pageSize);
      }
    }else{
      swal.fire({
        icon: "error",
        title: "error",
        text: "No more records available"
      })
    }
  }
}
