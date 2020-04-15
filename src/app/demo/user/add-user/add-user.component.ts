import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public fileData           : File = null;
  public previewUrl         : any = null;
  public fileUploadProgress : string = null;
  public uploadedFilePath   : string = null;
  public uploadAPI          = `${environment.apiUrl}/user/update/image`;

  title = 'budsbankadminpanel';
  public uploader: FileUploader = new FileUploader({
    'url'           : this.uploadAPI,
     itemAlias      : 'image',
     allowedFileType: ['image']
  });

  addUserForm = new FormGroup({
    userName    : new FormControl(''),
    email       : new FormControl(''), 
    firstName   : new FormControl(''),
    lastName    : new FormControl(''),
    phone       : new FormControl(''),
    password    : new FormControl(''),
    image       : new FormControl('')
  });

  constructor(private formBuilder: FormBuilder, private user: UserService, private router: Router) { }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item.file.name);
    };

    this.addUserForm = this.formBuilder.group({
      userName    : ['', [Validators.required]],
      email       : ['', [Validators.required, Validators.email]],
      firstName   : ['', [Validators.required]],
      lastName    : ['', [Validators.required]],
      phone       : ['', [Validators.required]],
      password    : ['', [Validators.required]],
      image       : [null]
    });
  }

  get username(){
    return this.addUserForm.get('userName');
  }

  get email(){
    return this.addUserForm.get('email');
  }

  get firstname(){
    return this.addUserForm.get('firstName');
  }

  get lastname(){
    return this.addUserForm.get('lastName');
  }

  get phone(){
    return this.addUserForm.get('phone');
  }

  get password(){
    return this.addUserForm.get('password');
  }

  get image(){
    return this.addUserForm.get('image');
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  onAddUserSubmit(){
    if (!this.addUserForm.invalid){
      var data = this.addUserForm.value;
      this.user.register(data).then(registerResponse => { console.log(registerResponse)
        if (registerResponse['status'] === 200){
          if (this.fileData){ 
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append('userId' , registerResponse['user'].id);
            }
            this.uploader.uploadAll();
            this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
              if(response){ 
                var formatedResponse = JSON.parse(response); 
                if (formatedResponse['status'] !== 200){
                  swal.fire('Error', `${formatedResponse['message']}`, 'error');
                }
              }
            }
          }
          this.router.navigate(['/admin/user/all']);
          swal.fire('Success', "User Added Successfully", 'success');
        }else{
          swal.fire('Error', `${registerResponse['message']}`, 'error');
        }
      });
    }
  }

}
