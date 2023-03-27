import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any = {};
  id: any;
  errormsg: any;
  constructor(private userService: UserService) { }

  ngOnInit() {

    let ConnectedUser = JSON.parse(localStorage.getItem("ConnectedUser"));
    console.log(ConnectedUser);

    // this.userService.getUserById(ConnectedUser.id).subscribe((data) => {
    //   this.user = data.user;
    // });


  }

  // editProfile() {
  //   console.log(this.user);
  //   // this.userService.editPorfile(this.user).subscribe((response) => {
  //   //   console.log("here the edit profile", response.message);
  //   //   this.user = response.data;

  //   });
  //   let ConnectedUser = JSON.parse(localStorage.getItem("ConnectedUser"));
  //   console.log(ConnectedUser);

  //   // this.userService.getUserById(ConnectedUser.id).subscribe((data) => {
  //   //   this.user = data.user;
  //   // });
  }



