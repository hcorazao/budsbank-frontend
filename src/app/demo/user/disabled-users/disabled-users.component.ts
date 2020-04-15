import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service'
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import swal from 'sweetalert2';

@Component({
  selector: 'app-disabled-users',
  templateUrl: './disabled-users.component.html',
  styleUrls: ['./disabled-users.component.scss']
})
export class DisabledUsersComponent implements OnInit {

  public allUsers: Object;
  public counter: number = 1;
  public pageSize: number = 10;
  public pageNumber: number = 0;

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
    this.loadDisabledUsers(this.pageNumber, this.pageSize);
  }

  loadDisabledUsers(pageNumber: number, pageSize: number) {
    this.user.getDisabledUsers(pageNumber, pageSize).then(response => { console.log(response)
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
          text: "No more records available",
        })
      }
    })
  }

  loadNextResults(){
    var pageNumber = this.pageNumber + 10; 
    this.pageNumber = pageNumber;
    this.loadDisabledUsers(pageNumber, this.pageSize);
  }

  loadPrevResults(){
    if (this.pageNumber !== 0){
      var pageNumber = this.pageNumber - 10;    
      this.pageNumber = pageNumber;
      if (pageNumber >= 0 && this.pageSize >= 0){
        this.loadDisabledUsers(pageNumber, this.pageSize);
      }
    }else{
      swal.fire({
        icon: "warning",
        title: "Warning",
        text: "No more records available",
      })
    }
  }

  viewUserProfile(userId: any) {
    this.router.navigateByUrl(`admin/user/${userId}`);
  }

  editUserProfile(userId: any){
    this.router.navigateByUrl(`admin/user/update/${userId}`);
  }

  activeUser(userId: any) {
    var data = {'userId': userId}
    this.user.activateUser(data).then(response => {
      if (response['status'] === 200){
        if (this.allUsers !== undefined){
          var size = Object.keys(this.allUsers).length;
          if (size == 1){
            var newObject: object;
            this.allUsers = newObject;
          }
        }
        this.loadDisabledUsers(this.pageNumber, this.pageSize);
        swal.fire({
          icon: "success",
          title: "Success",
          text: "User activated successfully",
        })
      }
    });
  }

  activateUserPopup(userId: any){
    swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Do you want to activate this user?",
      showCancelButton: true,
    }).then((response)=>{
      if (response.value){
        this.activeUser(userId);
      }
    });
  }

}
