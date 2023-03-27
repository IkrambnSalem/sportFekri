import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { generateId } from 'src/app/shared/genericFunction';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  path: string;
  msgError: string;
  imagePreview:any;
  // formBuilder c le nom il est variable je peux l'ecrire comme je vexux
  constructor(private formBuilder: FormBuilder,
    private router: Router, private userService: UserService  ) { }

  ngOnInit() {
    this.path = this.router.url;
    // console.log("here path",this.path);

    // create form inputs by FormBuilder
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]

    })
  }
  signup() {
    alert("btn clicked");
    console.log("here user object", this.signupForm.value);
    // if (this.path=="/subscription") {
    //   this.signupForm.value.role="user";
    // } else {
    //   this.signupForm.value.role="Admin";
    // }
    this.signupForm.value.role = (this.path == "/subscription") ? "user" : "Admin";
    // let usersTab=JSON.parse(localStorage.getItem("users")||"[]");
    // this.signupForm.value.id=generateId(usersTab);
    // usersTab.push(this.signupForm.value);
    // localStorage.setItem("users",JSON.stringify(usersTab));
    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe((data) => {
      console.log("the object is added", data);
      if (data.message == "error") {
        this.msgError = "Email Exist";
      } else {
        this.router.navigate(["signin"]);
      }

    });

  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("here file",file);
    
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}


