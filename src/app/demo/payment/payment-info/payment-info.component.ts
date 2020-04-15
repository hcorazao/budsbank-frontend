import { Component, OnInit,AfterViewInit, NgModule } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PaymentService } from '../../../services/payment/payment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// var SqPaymentForm;

declare var SqPaymentForm : any; //magic to allow us to access the SquarePaymentForm lib
var addPaymentForm : any;

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  // SqPaymentForm;
  // public paymentForm;
  public hit_nonce : any;

  addPaymentForm = new FormGroup({
    sqId    : new FormControl(''),
    cardNonce  : new FormControl('')
  });

  constructor(private formBuilder: FormBuilder, private payment: PaymentService, private http: HttpClient) { }

  paymentForm;


  ngOnInit() {
    this.paymentForm = new SqPaymentForm({
      // Initialize the payment form elements
      
      //TODO: Replace with your sandbox application ID
      applicationId: "sandbox-sq0idb-wYZM3PO6qGy_G5aAobIYkw",
      inputClass: 'sq-input',
      autoBuild: false,
      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
          fontSize: '16px',
          lineHeight: '24px',
          padding: '16px',
          placeholderColor: '#a0a0a0',
          backgroundColor: 'transparent',
      }],
      // Initialize the credit card placeholders
      cardNumber: {
          elementId: 'sq-card-number',
          placeholder: 'Card Number'
      },
      cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV'
      },
      expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY'
      },
      postalCode: {
          elementId: 'sq-postal-code',
          placeholder: 'Postal'
      },
      
      callbacks: {
        
          cardNonceResponseReceived: function (errors, nonce, cardData) {
          if (errors) {
              console.error('Encountered errors:');
              errors.forEach(function (error) {
                  console.error('  ' + error.message);
              });
              alert('Encountered errors, check browser developer console for more details');
              return;
          }
             //alert(`The generated nonce is:\n${nonce}`);



            // this.http.post('http://localhost:3300/process-payment').subscribe(nonce => {
            //     console.log('here i am');
            // });

            // this.payment.processPayment(nonce).then(paymentResponse => { console.log(paymentResponse)
            // });




             
          //(<HTMLInputElement>document.getElementById('card-nonce')).value = nonce;
          (<HTMLInputElement>document.getElementById('p-nonce')).innerHTML = nonce;
          //(<HTMLInputElement>document.getElementById('sq-id')).value = "CBASEC8F-Phq5_pV7UNi64_kX_4gAQ";
          console.log((<HTMLInputElement>document.getElementById('p-nonce')).innerHTML);
          (<HTMLFormElement>document.getElementById('onFormSubmit')).click();
           //(<HTMLFormElement>document.getElementById('nonceform')).submit();

            //  fetch('process-payment', {
            //   method: 'POST',
            //   headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify({
            //     nonce: nonce
            //   })
            // })
            // .catch(err => {
            //   alert('Network error: ' + err);
            // })
            // .then(response => {
            //   if (!response.ok) {
            //     return response.text().then(errorInfo => Promise.reject(errorInfo));
            //   }
            //   return response.text();
            // })
            // .then(data => {
            //   console.log(JSON.stringify(data));
            //   alert('Payment complete successfully!\nCheck browser developer console for more details');
            // })
            // .catch(err => {
            //   console.error(err);
            //   alert('Payment failed to complete!\nCheck browser developer console for more details');
            // });



          }
      }
    });
    this.paymentForm.build();
    console.log(this.paymentForm);
  
    this.addPaymentForm = this.formBuilder.group({
      sqId    : ['', [Validators.required]],
      cardNonce       : ['', [Validators.required]]
    });

  }


  get sqid(){
    return this.addPaymentForm.get('sqId');
  }

  get cardnonce(){
    return this.addPaymentForm.get('cardNonce');
  }

  onGetCardNonce(event: Event){
    event.preventDefault();
    this.paymentForm.requestCardNonce();
    console.log(this.paymentForm);
    console.log(event);
  } 

  // onPaymentSubmit(){
  //     var data = this.addPaymentForm.value;
  //     console.log('---dfdfdfd-----');
  //     console.log(data);
  //     console.log('---dfdfdfd-----');

  //     this.payment.processPayment(data).then(paymentResponse => { console.log(paymentResponse)
  //     });
  // }

  onFormSubmit(event: Event){
    this.hit_nonce = (<HTMLInputElement>document.getElementById('p-nonce')).innerHTML;
    console.log(this.hit_nonce);
    var data = {
      cardNonce : this.hit_nonce
    }
    console.log(data)
    this.payment.processPayment(data).then(paymentResponse => { console.log(paymentResponse)
      });
  }

  ngAfterViewInit(){}

}





