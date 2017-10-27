import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { User } from '../registeruser/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public isValid: boolean;
  public userFromDB: any;
  public isExist:boolean;

  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    this.user = {
      userName: '',
      email: '',
      password: '',
      role: ''
    }
  }

 
  login(user:User, isValid: boolean) {
    this.dataService.getUserByEmail(user.email).subscribe(
      data => {
        this.userFromDB=data.json();
        if (this.userFromDB !=null){
          if(user.email==this.userFromDB.email&&user.password==this.userFromDB.password){
           
          this.router.navigate(["user-profile", this.user.email]);
        }
        else{
           this.isExist=true;
        }
        }
        else{
               this.isExist=true;
      }
      }
    )
    
  }

  upDate(email) {
    console.log("00000000" + email)
    this.dataService.getUserByEmail(email).subscribe(data => {
      this.user = data.json();
      this.dataService.middleData(data);
      this.dataService.updateUser(new User(

        this.user.userName,
        this.user.email,
        this.user.password,
        this.user.role
      )
      )
    });
  }

  


}
