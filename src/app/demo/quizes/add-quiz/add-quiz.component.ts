import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { QuizService } from '../../../services/quiz/quiz.service';
import { DispensariesService } from '../../../services/dispensaries/dispensaries.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  public errorDivContent    = [];
  public fileData           : File    = null;
  public previewUrl         : any     = null;
  public fileUploadProgress : string  = null;
  public uploadedFilePath   : string  = null;
  public uploadAPI          = `${environment.apiUrl}/quiz/upload`;

  public uploader: FileUploader = new FileUploader({
    'url'           : this.uploadAPI,
     itemAlias      : 'file'
  });

  public quizDataToUpload   = [];

  addQuizForm = new FormGroup({
    dispensary    : new FormControl(''),
    file          : new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private dispensaryService: DispensariesService,
    private quizService: QuizService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item.file.name);
    };

    this.addQuizForm = this.formBuilder.group({
      file          : ['', [Validators.required]],
    });  
  
  }

  fileProgress(fileInput: any) {
    this.quizDataToUpload = [];
    this.fileData = <File>fileInput.target.files[0];
    const fileReader = new FileReader();
    let errorList = [];
    fileReader.readAsText(this.fileData, "UTF-8");
    fileReader.onload = () => { 
      var finalResult = JSON.parse(`${fileReader.result}`);
      
      finalResult.forEach( element => { 
        if (element.hasOwnProperty("question_text") && element.hasOwnProperty("answers")){ 
          let answers = element["answers"][0];
          if (answers.hasOwnProperty("answer_a") && answers.hasOwnProperty("answer_b") && answers.hasOwnProperty("answer_c") && answers.hasOwnProperty("answer_d") && answers.hasOwnProperty("correct_answer")){
            this.quizDataToUpload.push(element);
          }else{
            errorList.push(element);
          }
        }else{
          errorList.push(element);
        }
      });
      this.errorDivContent = errorList;
    }
    fileReader.onerror = (error) => {
      errorList.push(error);
    }
  }

  emptyErrorList(){
    if (this.errorDivContent.length > 0){ 
      this.errorDivContent = [];
    }
  }

  get file(){
    return this.addQuizForm.get('file');
  }

  onQuizSUbmit(){

    if (!this.addQuizForm.invalid){
      this.showSpinner('spinner1')
      var data = {};
      data['data'] = this.quizDataToUpload; console.log(data)
      
      this.quizService.uploadQuiz(data).then( response => {
        if (response['status'] === 200){
          this.hideSpinner('spinner1');
          swal.fire(
            'Success',
            'Quiz importes successfully',
            'success'
          );
        }else{
          swal.fire(
            'Error',
            'Internal Server Error',
            'error'
          )
        }
      })
    }
  }

  showSpinner(name: string) { 
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }

}
