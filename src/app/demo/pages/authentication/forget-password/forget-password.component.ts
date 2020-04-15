import { Component, OnInit } from '@angular/core';
import { NgForm ,FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {


resetPasswordForm = new FormGroup({
    email: new FormControl('')
  })

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
  	this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email(){
    return this.resetPasswordForm.get('email');
  }

  onResetSubmit() {
    if (!this.resetPasswordForm.invalid){
      this.showSpinner('spinner1');
      const email = this.resetPasswordForm.get('email').value;
      console.log(email);
      this.auth.forgetpassword(email).then(forgetResponse => { 
      	console.log(forgetResponse);
        // if (loginResponse['status'] === 200){
        //   if (loginResponse['data'].length > 0){
        //     this.auth.setUserInfo(loginResponse['data']);
        //     this.router.navigateByUrl('dashboard/default');
        //   }
        // }else{
        //   this.setAuthenticationError(loginResponse['message']);
        // }

        if (forgetResponse['status'] === 200){
          this.hideSpinner('spinner1');
          swal.fire('Success', "Reset Email sent successfully. Please check you email", 'success');
          this.router.navigateByUrl('auth/signin');
        }else{
          this.hideSpinner('spinner1');
          swal.fire('Error', `${forgetResponse['message']}`, 'error');
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
