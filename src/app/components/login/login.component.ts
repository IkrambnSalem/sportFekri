import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { generateId } from 'src/app/shared/genericFunction';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errormsg:any;

  constructor(private formBuilder: FormBuilder,
    private router:Router, private userService:UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ["", [Validators.required, Validators.email]],
      password:["", [Validators.required]]
    })
  }

  login() {
    console.log("here the object of", this.loginForm.value);
    // let usersTab=JSON.parse(localStorage.getItem("users")||"[]");
    // this.loginForm.value.id=generateId(usersTab);
    // for (let i = 0; i < usersTab.length; i++) {
    //   if (usersTab[i].Email== this.loginForm.value.Email && usersTab[i].password== this.loginForm.value.password) {
    // this.userService.login(this.loginForm.value).subscribe((response)=>{
    //   console.log("response after login",response);
    //    if (response.message== "2") {
    //     localStorage.setItem("ConnectedUser",JSON.stringify(response.userToSend) );
    //     this.router.navigate ([""]);
    //   } else{
    //     this.errormsg = "please check Email/PWD"
    //   }
    
    // });  
    let user = this.loginForm.value;
    this.userService.login(user);  
   
      }
      }
      
    
  


