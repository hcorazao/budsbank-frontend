import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service'
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public allUsers: Object;
  public counter: number = 1;
  public pageSize: number = 10;
  public pageNumber: number = 0;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.loadActiveUsers(this.pageNumber, this.pageSize);
  }

  loadActiveUsers(pageNumber: number, pageSize: number) {
    this.user.getActiveUsers(pageNumber, pageSize).then(response => { 
      if (response['status'] === 200){
        if (response['data'].length > 0){
          this.allUsers = response['data'];
        }else{
          this.allUsers = null;
        }
      }else{
        if (this.pageNumber !== 0){
          this.pageNumber = this.pageNumber - 10;
        }
        swal.fire({
          icon: "error",
          title: "error",
          text: "No more records available"
        })
      }
    })
  }

  loadNextResults(){
    var pageNumber = this.pageNumber + 10; 
    this.pageNumber = pageNumber; console.log("PageNumber : ", this.pageNumber); console.log("pageSize : ", this.pageSize );
    this.loadActiveUsers(pageNumber, this.pageSize);
  }

  loadPrevResults(){ console.log("PageNumber : ", this.pageNumber); console.log("pageSize : ", this.pageSize );
    if (this.pageNumber !== 0){
      var pageNumber = this.pageNumber - 10;    
      this.pageNumber = pageNumber;
      if (pageNumber >= 0 && this.pageSize >= 0){
        this.loadActiveUsers(pageNumber, this.pageSize);
      }
    }else{
      swal.fire({
        icon: "error",
        title: "error",
        text: "No more records available"
      })
    }
  }

  viewUserProfile(userId: any) {
    this.router.navigateByUrl(`admin/user/${userId}`);
  }

  editUserProfile(userId: any){
    this.router.navigateByUrl(`admin/user/update/${userId}`);
  }

  disableUser(userId: any){
    var data = {'userId': userId}
    this.user.disableUser(data).then(response => {
      if (response['status'] === 200){
        if (this.allUsers !== undefined){
          var size = Object.keys(this.allUsers).length;
          if (size == 1){
            var newObject: object;
            this.allUsers = newObject;
          }
        }
        swal.fire({
          icon: "success",
          title: "Success",
          text: "User disabled successfully",
        })
        this.loadActiveUsers(this.pageNumber, this.pageSize);
      }
    });
  }

  showWarningPopup(userId: any){
    swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Do you want to disable this user?",
      showCancelButton: true,
    }).then((response)=>{
      if (response.value){
        this.disableUser(userId);
      }
    });
  }

}
