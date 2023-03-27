import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userurl: string = "http://localhost:3000/allUsers"
  public token: string;
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;
  private name: string;

  constructor(private http: HttpClient, private router: Router) { }
  getToken() {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  isUserAuth() {
    return this.isUserAuthenticated;
  }
  getName() {
    return this.name;
  }


  // signup(obj, img: File) {
  signup(obj, img: File) {
    let formData = new FormData();
    formData.append("firstName", obj.firstName);
    formData.append("lastName", obj.lastName);
    formData.append("email", obj.email);
    formData.append("pwd", obj.pwd);
    formData.append("img", img);
    return this.http.post<{ message: string }>(this.userurl + "/subscription", formData);
  }
  editProfile(newUser) {
    return this.http.put(this.userurl, newUser);
  }

  login(obj) {
    this.http.post<{ user: any, message: string }>(this.userurl + "/signin", obj).subscribe(
      (res) => {
        console.log("here response",res);
        
       const token = res.user.jwt;
        this.token = token;
        if (res.user) {
          this.isUserAuthenticated = true;
          this.name = res.user.firstName + "" + res.user.lastName;
          this.authStatusListener.next(true);
          localStorage.setItem('token', token);
          localStorage.setItem('name', this.name);
          this.router.navigate(['/']);
        }
      }
    )
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

}
