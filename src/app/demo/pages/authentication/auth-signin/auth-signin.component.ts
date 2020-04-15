import { Component, OnInit } from '@angular/core';
import { NgForm ,FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  public authenticationError: string;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  setAuthenticationError(message: string){
    this.authenticationError = message;
  }

  async onLoginSubmit() {
    if (!this.loginForm.invalid){
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.auth.validate(email, password).then(loginResponse => { 
        if (loginResponse['status'] === 200){
          if (loginResponse['data'].length > 0){
            this.auth.setUserInfo(loginResponse['data'][0]);
            window.location.href = '/';
            // this.router.navigateByUrl('dashboard/default');
          }
        }else{
          this.setAuthenticationError(loginResponse['message']);
        }
      })
    }
  }

}
