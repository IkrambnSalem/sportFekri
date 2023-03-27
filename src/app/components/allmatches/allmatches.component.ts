import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-allmatches',
  templateUrl: './allmatches.component.html',
  styleUrls: ['./allmatches.component.css']
})
export class AllmatchesComponent implements OnInit {

  matchesTab:any= [];
    
  constructor(private matchService:MatchService,
    private router:Router) { }

  ngOnInit() {
    // this.matchesTab=JSON.parse(localStorage.getItem("matches")||"[]");
    this.matchService.getAllMatch().subscribe((response)=>{
  this.matchesTab=response.matches;
      
    });
  }

  upDateMatches(objs:any){
this.matchesTab=objs;
  }
}
