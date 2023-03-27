import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  match:any={scoreOne:2,scoreTwo:1,teamOne:"ca",teamTwo:"EST"};
  article:any={title:"chahd",date:12/52/2116,description:"hello"}
  constructor() { }

  ngOnInit() {
  }

}
