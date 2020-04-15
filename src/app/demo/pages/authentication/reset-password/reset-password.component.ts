import { Component, OnInit } from '@angular/core';
import { NgForm ,FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public token : any;

updatePasswordForm = new FormGroup({
    password: new FormControl(''),
    confirm_password: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
  	this.updatePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  get password(){
    return this.updatePasswordForm.get('password');
  }
  get confirm_password(){
    return this.updatePasswordForm.get('confirm_password');
  }

  onResetPasswordSubmit() {
    if (!this.updatePasswordForm.invalid){
      this.showSpinner('spinner1');
      //const token = this.currentRoute.params.value.id;
      this.currentRoute.params.subscribe(params => { 
          console.log(params.id);
          this.token = params.id;
      });


      const password = this.updatePasswordForm.get('password').value;
      const confirm_password = this.updatePasswordForm.get('confirm_password').value;
      console.log(password);
      console.log(confirm_password);
      this.auth.updateResetpassword(password, confirm_password, this.token).then(forgetResponse => { 
      	console.log(forgetResponse);
      	//var getResponse = JSON.parse(forgetResponse);
        if (forgetResponse['status'] === 200){
          this.hideSpinner('spinner1');
          swal.fire('Success', "Password Reset Successfully", 'success');
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
