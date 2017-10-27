import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { User } from '../registeruser/user';
import {ViewEncapsulation} from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
   encapsulation: ViewEncapsulation.None,
})
export class UserProfileComponent implements OnInit {
 public user: User;
 public show:boolean;
 public email:any;
 
 
 
  constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) { }

  
  ngOnInit() {
    
  this.route.params.subscribe((params: Params) => {
        this.email = params['email'];
        console.log( this.email);
      });
  }
   
upDate(){
  
 
   console.log("00000000"+this.email)
     
        this.dataService.updateUser( new User(
         
         this.user.userName,
         this.user.email,
         this.user.password,
         this.user.role
       )
       );
   
   }

   showForm(){
     console.log(this.email+"kskjsk")
    // this. email='lwi75@yahoo.com'
     this.dataService.getUserByEmail(this.email).subscribe(data=>{
       console.log(data)
        this.user = data.json();
         this.show=true;
        });
    
   }
   deleteUser() {
    
    this.dataService.deleteUser(this.email);
    this.router.navigate(["login"]);
  }
}
