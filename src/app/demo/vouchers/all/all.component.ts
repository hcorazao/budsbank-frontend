import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../../services/voucher/voucher.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  public allVouchers = [];
  public pageSize: number = 10;
  public pageNumber: number = 0;

  constructor(
  	private voucherService: VoucherService
  	) { }

  ngOnInit() {
  	this.getVouchers(this.pageNumber, this.pageSize);
  }

  getVouchers(pageNumber: number, pageSize: number){
		this.voucherService.getVoucher(pageNumber, pageSize).then( response => { 
			console.log(response);
			if (response['status'] === 200){
		        if (response['data'].length > 0){
		          this.allVouchers = response['data'];
		          console.log(this.allVouchers);
		        }else{
		          this.allVouchers = null;
		        }
			}else{
		        if (this.pageNumber !== 0){
		          this.pageNumber = this.pageNumber - 10;
		        }
			}
    	});
  }

  loadNextResults(){
    var pageNumber = this.pageNumber + 10; 
    this.pageNumber = pageNumber;  
    this.getVouchers(pageNumber, this.pageSize);
  }

  loadPrevResults(){ 
    if (this.pageNumber !== 0){
      var pageNumber = this.pageNumber - 10;    
      this.pageNumber = pageNumber;
      if (pageNumber >= 0 && this.pageSize >= 0){
        this.getVouchers(pageNumber, this.pageSize);
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
