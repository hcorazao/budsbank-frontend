import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  public userProfile: any;

  constructor(private user: UserService, private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.currentRoute.params.subscribe(params => {
      this.user.getUserById(params.id).then(response => { 
      
        if (response['status'] === 200){
          if (response['data'].length > 0){
            this.userProfile = response['data'][0]; 
            this.userProfile['created'] = this.formatDate(this.userProfile.created);
          }
        }else{
          console.log(response);
          swal.fire('Error', 'Internal Server Error', 'error');
        }
      });
    });
  }

  formatDate(date: any) {
    var newDate = new Date(date);
    let month = "" + (newDate.getMonth() + 1);
    let day =   "" + newDate.getDate();
    let year = newDate.getFullYear(); 
    
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("-");
  }

  updateProfile(userId: any) {
    this.router.navigateByUrl(`admin/user/update/${userId}`);
  }

}
