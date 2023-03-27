import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogTable: any = [{
    id: 1, title: "chahd", date: "12 / 52 / 2116", description: "hello"
  },
  { id: 2, title: "irkam", date: "12 / 52 / 2116", description: "hello" }]

  constructor() { }

  ngOnInit() {
  }

}
