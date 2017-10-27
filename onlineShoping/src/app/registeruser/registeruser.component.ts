import { Component, OnInit,Input,Output,ViewChild } from '@angular/core';
import { User } from './user';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-registeruser',
    templateUrl: './registeruser.component.html',
    styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {
    @ViewChild('f') form:NgForm;
    public user: User;
     public isValid: boolean;
    public emailExist: boolean;
     public success: boolean;
    public userFromDB: any;     

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit() {
        
        this.user = {
            userName: '',
            email: '',
            password: '',
            role: ''
        }
    
    }

    save(user: User, isValid: boolean) {
        this.isValid = isValid;
        this.dataService.getUserByEmail(user.email).subscribe(
            (data) => {
                this.userFromDB = data.json();
                if(this.userFromDB != null){
                    this.emailExist = true;
                    console.log("User with email already exist, please try another email.");
                }
                else if(isValid){
                    this.emailExist=false;
                    console.log("User added successfully!");
                    this.dataService.addUser(new User(
                        user.userName,
                        user.email,
                        user.password,
                        user.role
                    ));
                    this.success=true;
                  this.router.navigate(["user-profile", this.user.email]);
                
                }
                console.log(this.userFromDB);
               
            });

             
    };






    
}
