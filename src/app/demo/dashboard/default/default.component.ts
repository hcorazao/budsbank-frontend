import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service'
import { element } from 'protractor';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public totalUsers         :   number = 0;
  public totalDispensaries  :   number = 0;
  public totalQuestions     :   number = 0;
  public recentUsers        :   any;
  public is_adminUser    :   any;
  public userID: any;

  constructor(private user: UserService) { }

  ngOnInit() {
    let admin = JSON.parse(localStorage.getItem('userInfo'));
    this.userID = admin.id;
    console.log(admin.id);
    if(admin.id === 1){
      this.is_adminUser = true;
      console.log('admin here');
    }else{
      this.is_adminUser = false;
      console.log('business user here');
      // window.location.href = '#/admin/dispensary/all';
    }
    this.user.getDashboradData(this.userID).then( response => {
      if (response['status'] === 200){
        this.totalUsers = response['data'].allUsers;
        this.totalDispensaries = response['data'].allDispensaries;
        this.totalQuestions = response['data'].allQuestions;
        this.recentUsers = response['data'].recentUsers;
        this.recentUsers.forEach( element => {
          element['created'] = this.formatDate(element['created'])
        })
      }
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

}
