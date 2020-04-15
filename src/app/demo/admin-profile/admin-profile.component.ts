import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  public userProfile: any;

  constructor(private router: Router, private auth: AuthService, private user: UserService) { }

  ngOnInit() {
    // let admin = JSON.parse(localStorage.getItem('userInfo'));
    let admin = JSON.parse(localStorage.getItem('userInfo'));
    console.log(admin.id);
    this.user.getAdminProfile(admin.id).then( data => { console.log(data['admin']);
      this.userProfile = data['admin'];
      this.userProfile['updated_at'] = this.formatDate(this.userProfile['updated_at'])
    })
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

  updateProfile = (adminId) => {
    this.router.navigateByUrl(`/admin/profile/update/${adminId}`);
  }

}
