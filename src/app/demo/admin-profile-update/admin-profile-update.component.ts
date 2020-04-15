import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-profile-update',
  templateUrl: './admin-profile-update.component.html',
  styleUrls: ['./admin-profile-update.component.scss']
})
export class AdminProfileUpdateComponent implements OnInit {

  updateAdminForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  updatePassword = new FormGroup({
    previousPassword: new FormControl(''),
    newPassword: new FormControl('')
  })

  public admin: any;

  constructor(private formBuilder: FormBuilder, private user: UserService, private auth: AuthService, private route: Router) { }

  ngOnInit() {
    this.admin = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.admin)
    this.updateAdminForm.controls['name'].setValue(this.admin.name);
    this.updateAdminForm.controls['email'].setValue(this.admin.email);
    console.log(this.updateAdminForm);

    this.updateAdminForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get name(){
    return this.updateAdminForm.get('name');
  }

  get email(){
    return this.updateAdminForm.get('email');
  }

  onUpdateAdminSubmit = (adminForm: any) => {
    if (!this.updateAdminForm.invalid){
      let profile = this.updateAdminForm.value;
      profile['id'] = this.admin.id;
      this.user.updateAdminProfile(profile).then( response => {
        if (response['status'] === 200){ 
          // this.auth.setUserInfo(response['admin']);
          swal.fire('Success', 'Profile updated successfully', 'success').then((result) => {
            this.route.navigateByUrl('/admin/profile');
          });
        }else{
          swal.fire('Error', 'Internal Server Error', 'error').then((result) => {
            this.route.navigateByUrl('/admin/profile');
          });
        }
      })
    }
  }

  passwordPopUp = () => {
    let prevPassword = '';
    let newPassword = '';
    let confirmPassword = '';
    swal.fire({
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Previous Password" type="password">' +
      '<input id="swal-input2" class="swal2-input" placeholder="New Password" type="password">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Confirm Password" type="password">',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      focusConfirm: false,
      preConfirm: function () {
        return new Promise((resolve, reject) => {
                resolve({
                  prevPassword:     $('input[id="swal-input1"]').val(),
                  newPassword:      $('input[id="swal-input2"]').val(),
                  confirmPassword:  $('input[id="swal-input3"]').val(),
                });
            });
        },
      icon: 'info',
      title: 'Change Password',
      showCancelButton: true,
    }).then((result) => {
      let passwordValues = result.value; 
      if (passwordValues.newPassword !== passwordValues.confirmPassword){
        swal.fire('Error', 'Confirm Password does not match', 'error');
      }else{
        if (passwordValues.newPassword.length < 6){
          swal.fire('Error', 'Password should be atleast 6 characters', 'error');
        }else{
          if (passwordValues.prevPassword !== this.admin.password){
            console.log(passwordValues.prevPassword);
            console.log(this.admin.password);
            swal.fire('Error', 'Previous password does not match', 'error');
          }else{
            if (passwordValues.newPassword === this.admin.password){
              swal.fire('Error', 'New password should be different from previous password', 'error');
            }else{
              let data = { 'id': this.admin.id, 'password': passwordValues.newPassword };
              this.user.updateAdminPassword(data).then( response => {
                if (response['status'] === 200){
                  swal.fire('Success', 'password updated successfully', 'success');
                }else{
                  swal.fire('Error', 'Internal Server Error', 'error');
                }
              })
              
            }
          }
        }
      }
      
    })

    
  }

}
