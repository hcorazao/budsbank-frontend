import { Component, OnInit } from '@angular/core';
import { DispensariesService } from '../../../services/dispensaries/dispensaries.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-disabled-dispensaries',
  templateUrl: './disabled-dispensaries.component.html',
  styleUrls: ['./disabled-dispensaries.component.scss']
})
export class DisabledDispensariesComponent implements OnInit {
  
  public allDispensaries: Object;
  public counter: number = 1;
  public pageSize: number = 10;
  public pageNumber: number = 0;
  public userID: any;

  constructor(private dispensaries: DispensariesService, private router: Router) { }

  ngOnInit() {
    let admin = JSON.parse(localStorage.getItem('userInfo'));
    this.userID = admin.id;
    this.loadDisabledDispensaries(this.pageNumber, this.pageSize, this.userID);
  }

  loadDisabledDispensaries(pageNumber: any, pageSize: any, userID: string){
    console.log(userID);
    this.dispensaries.getDisabledDispensaries(pageNumber, pageSize, userID).then(response => { 
      if (response['status'] === 200){
        if (response['data'].length > 0){
          this.allDispensaries = response['data'];
        }else{
          this.allDispensaries = null;
        }
      }else{
        if (this.pageNumber !== 0){
          this.pageNumber = this.pageNumber - 10;
        }
        swal.fire('Error', 'No more records available', 'error');
      }
    })
  }

  loadNextResults(){
    var pageNumber = this.pageNumber + 10; 
    this.pageNumber = pageNumber;
    this.loadDisabledDispensaries(pageNumber, this.pageSize, this.userID);
  }

  loadPrevResults(){
    if (this.pageNumber !== 0){
      var pageNumber = this.pageNumber - 10;    
      this.pageNumber = pageNumber;
      if (pageNumber >= 0 && this.pageSize >= 0){
        this.loadDisabledDispensaries(pageNumber, this.pageSize, this.userID);
      }
    }else{
      swal.fire({
        icon: "error",
        title: "error",
        text: "No more previous records available",
      })
    }
    
  }

  viewDispensary(dispensaryId: any) {
    this.router.navigateByUrl(`admin/dispensary/${dispensaryId}`);
  }

  editDispensary(dispensaryId: any){
    this.router.navigateByUrl(`admin/dispensary/update/${dispensaryId}`);
  }

  onActivateDispensary(dispensaryId: any){
    var data = { 'dispensaryId': dispensaryId }
  
    this.dispensaries.activateDispensary(data).then(response => {
      if (response['status'] === 200){
        swal.fire('Success', 'Dispensary Activated Successfully', 'success');
        if (this.allDispensaries !== undefined){
          var size = Object.keys(this.allDispensaries).length;
          if (size == 1){
            var newObject: object;
            this.allDispensaries = newObject;
          }
        }
        this.loadDisabledDispensaries(this.pageNumber, this.pageSize, this.userID);
      }
    });
  }

  activateDispensaryPopup(dispensaryId: any){
    swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Do you want to activate this dispensary?",
      showCancelButton: true,
    }).then((response)=>{
      if (response.value){
        this.onActivateDispensary(dispensaryId);
      }
    });
  }

}
