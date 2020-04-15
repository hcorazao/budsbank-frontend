import { Component, OnInit } from '@angular/core';
import { DispensariesService } from '../../../services/dispensaries/dispensaries.service'
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dispensaries-list',
  templateUrl: './dispensaries-list.component.html',
  styleUrls: ['./dispensaries-list.component.scss']
})
export class DispensariesListComponent implements OnInit {

  public allDispensaries: Object;
  public counter: number = 1;
  public pageSize: number = 10;
  public pageNumber: number = 0;
  public userID: any;

  constructor(private dispensary: DispensariesService, private router: Router) { }

  ngOnInit() {
    let admin = JSON.parse(localStorage.getItem('userInfo'));
    this.userID = admin.id;
    this.loadActiveDispensaries(this.pageNumber, this.pageSize, this.userID);
  }

  loadActiveDispensaries(pageNumber: number, pageSize: number, userID: string) {
    this.dispensary.getActiveDispensaries(pageNumber, pageSize, userID).then(response => { 
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
        //swal.fire('Error', 'No more records available', 'error');
      }
    })
  }

  loadNextResults(){
    var pageNumber = this.pageNumber + 10; 
    this.pageNumber = pageNumber; console.log("PageNumber : ", this.pageNumber); console.log("pageSize : ", this.pageSize );
    this.loadActiveDispensaries(pageNumber, this.pageSize, this.userID);
  }

  loadPrevResults(){ console.log("PageNumber : ", this.pageNumber); console.log("pageSize : ", this.pageSize );
    if (this.pageNumber !== 0){
      var pageNumber = this.pageNumber - 10;    
      this.pageNumber = pageNumber;
      if (pageNumber >= 0 && this.pageSize >= 0){
        this.loadActiveDispensaries(pageNumber, this.pageSize, this.userID);
      }
    }else{
      swal.fire({
        icon: "error",
        title: "error",
        text: "No more previous records available"
      })
    }
    
  }

  createDispensary(){
    this.router.navigateByUrl(`admin/dispensary/add`);
  }
  viewDispensary(dispensaryId: any) {
    this.router.navigateByUrl(`admin/dispensary/${dispensaryId}`);
  }

  editDispensary(dispensaryId: any){
    this.router.navigateByUrl(`admin/dispensary/update/${dispensaryId}`);
  }

  onDisableDispensary(dispensaryId: any){
    var data = {'dispensaryId': dispensaryId}
    this.dispensary.disableDispensary(data).then(response => {
      if (this.allDispensaries !== undefined){
        var size = Object.keys(this.allDispensaries).length;
        if (size == 1){
          var newObject: object;
          this.allDispensaries = newObject;
        }
      }
      if (response['status'] === 200){
        swal.fire({
          icon: "success",
          title: "success",
          text: "Dispensary disabled successfully",
          showCancelButton: true,
        })
        this.loadActiveDispensaries(this.pageNumber, this.pageSize, this.userID);
      }
    });
  }

  disableDispensaryPopup(dispensaryId: any){
    swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Do you want to disable this dispensary?",
      showCancelButton: true,
    }).then((response)=>{
      if (response.value){
        this.onDisableDispensary(dispensaryId);
      }
    });
  }

}
