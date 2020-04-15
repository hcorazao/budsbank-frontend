import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { PaymentService } from '../../../../services/payment/payment.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

declare var SqPaymentForm: any;
var addPaymentForm: any;

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  public authenticationError: string;
  // SqPaymentForm;
  public paymentForm;
  public hit_nonce: any;
  public data: any;
  public showPayment: boolean = false;
  public showRegister: boolean = true;
  toggleBool: boolean = true;
  disabledAgreement: boolean = false;

  registerForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private payment: PaymentService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordConfirming });
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }
  onGetCardNonce(event: Event) {
    event.preventDefault();
    this.paymentForm.requestCardNonce();
  }
  
  changeCheck(event) {
    console.log(event.target.checked);
    this.disabledAgreement = event.target.checked;
    if((this.disabledAgreement)){
      this.setAuthenticationError('');
    }
  }
  onFormSubmit(event: Event) {
    this.showSpinner('spinner1');
    this.hit_nonce = (<HTMLInputElement>document.getElementById('p-nonce')).innerHTML;

    var data = {
      cardNonce: this.hit_nonce
    }

    this.payment.processPayment(data).then(paymentResponse => {
      // console.log(paymentResponse)
      if (paymentResponse['status'] === 200) {
        this.data['cardNonce'] = this.hit_nonce;
        this.auth.register(this.data).then(registerResponse => {
          if (registerResponse['status'] === 200) {
            this.auth.setUserInfo(registerResponse['user']);
            window.location.href = '/';
            // window.location.href = '#/admin/dispensary/all';
            // this.router.navigateByUrl('dashboard/default');  
          } else {
            this.setAuthenticationError(registerResponse['message']);
          }
        })
      }
    });
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }
  get lastname() {
    return this.registerForm.get('lastname');
  }
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  setAuthenticationError(message: string) {
    this.authenticationError = message;
  }

  onRegisterSubmit() {
    if(!(this.disabledAgreement)){
        this.setAuthenticationError('Please Confirm terms and conditions');
    }else{
        if (!this.registerForm.invalid) {
            const name = this.registerForm.get('firstname').value + ' ' +
            this.registerForm.get('lastname').value;
            const email = this.registerForm.get('email').value;
            const password = this.registerForm.get('password').value;

            this.data = {
              'name': name,
              'email': email,
              'password': password
            }

            let validation = this.passwordValidator(password);
            if (!validation) {
              this.setAuthenticationError('Password must be atleast of 6 characters');
            }else{

              let emailData = {
                'email': email
              }
              this.auth.checkEmail(emailData).then(response => {
                if (response['status'] === 200) {

                  console.log(this.data);
                   this.auth.register(this.data).then(registerResponse => {
                      if (registerResponse['status'] === 200) {
                        this.auth.setUserInfo(registerResponse['user']);
                        window.location.href = '/';
                        // window.location.href = '#/admin/dispensary/all';
                        // this.router.navigateByUrl('dashboard/default');  
                      } else {
                        this.setAuthenticationError(registerResponse['message']);
                      }
                    });


                } else {
                  this.setAuthenticationError('Email already exists');
                }
              })
            }
        }else{
          this.setAuthenticationError('Please Enter Valid Email Address');
        }
    }
  }

  passwordValidator = (password: string) => {
    let valid = false;
    if (password.length > 5) valid = true;
    return valid;
  }

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }

}
