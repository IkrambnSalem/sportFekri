import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  user: any;
  private authListenerSubs: Subscription;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.user = this.userService.getName();
      })
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    }
    logout() {
    this.userService.logout();
    }
}