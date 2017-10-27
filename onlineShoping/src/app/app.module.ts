import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import{DataService} from './data.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ValidateEqualDirective } from './validate-equal.directive';
import { Router, CanActivate } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthguardGuard } from './authguard.guard';

const appRoutes:Routes=[
  {
    path:'login',
    component:LoginComponent
  },
  {
   path:'register',
   component:RegisteruserComponent
  },
  {
    path:'user-profile/:email',
    component:UserProfileComponent,
   canActivate:[ AuthguardGuard]
  },
  
  {
   path: '**', 
   redirectTo: '' 
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisteruserComponent,
    ValidateEqualDirective,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,

    RouterModule,
    ReactiveFormsModule,
    HttpModule,
     RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
