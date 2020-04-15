import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent implements OnInit {

  public userProfile        : any;
  public imageName          : string;
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

  updateUserForm = new FormGroup({
    username    : new FormControl(''),
    email       : new FormControl(''), 
    first_name  : new FormControl(''),
    last_name   : new FormControl(''),
    phone       : new FormControl(''),
    image       : new FormControl(''),
    user_id     : new FormControl('')
  });

  constructor(private formBuilder: FormBuilder, private user: UserService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item.file.name);
    };

    this.updateUserForm = this.formBuilder.group({
      username    : ['', [Validators.required]],
      email       : ['', [Validators.required, Validators.email]],
      first_name  : ['', [Validators.required]],
      last_name   : ['', [Validators.required]],
      phone       : ['', [Validators.required]],
      image       : [null],
      user_id     : ['']
    });

    this.currentRoute.params.subscribe(params => {
      this.user.getUserById(params.id).then(response => { 
        if (response['status'] === 200){
          if (response['data'].length > 0){
            this.userProfile = response['data'][0]; 
            this.updateUserForm.controls['username'].setValue(this.userProfile.username);
            this.updateUserForm.controls['email'].setValue(this.userProfile.email);
            this.updateUserForm.controls['first_name'].setValue(this.userProfile.first_name);
            this.updateUserForm.controls['last_name'].setValue(this.userProfile.last_name);
            this.updateUserForm.controls['phone'].setValue(this.userProfile.phone);
            this.updateUserForm.controls['image'].setValue(this.userProfile.image); 
            this.updateUserForm.controls['user_id'].setValue(this.userProfile.id);
          }
        }else{
          console.log(response);
          swal.fire('Error', 'Auth Provider is not available', 'error');
        }
      });
    });
  }

  get username(){
    return this.updateUserForm.get('username');
  }

  get email(){
    return this.updateUserForm.get('email');
  }

  get first_name(){
    return this.updateUserForm.get('first_name');
  }

  get last_name(){
    return this.updateUserForm.get('last_name');
  }

  get phone(){
    return this.updateUserForm.get('phone');
  }

  get image(){
    return this.updateUserForm.get('image');
  }

  get user_id(){
    return this.updateUserForm.get('user_id');
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

  onUpdateUserSubmit(){ 
    if (!this.updateUserForm.invalid){
      var data = this.updateUserForm.value;
      data['user_id'] = this.userProfile.id; 
      this.user.update(data).then(updateResponse => { 
        if (updateResponse['status'] === 200){
          if (this.fileData){ 
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append('userId' , updateResponse['user'].id);
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
          swal.fire('Success', "User Updated Successfully", 'success');
        }else{
          swal.fire('Error', `${updateResponse['message']}`, 'error');
        }
      }); 
    }
  }

}
