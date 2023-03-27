import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
matches:any = [];

  constructor( private router:Router,private matchService:MatchService) { }

  ngOnInit() {
    this.matchService.getAllMatch().subscribe((data)=> {
      this.matches=data.matches;
    })
  }
  displayMatch(x:number){
   this.router.navigate([`match-info/${x}`])
  }

  goToEdit(id:number){
    this.router.navigate([`edit-match/${id}`])
   }
   deleteMatch(x:number){
    
  //   for (let i = 0; i < this.matches.length; i++) {
  //       if (this.matches[i].id == x) {
  //         this.matches.splice(i, 1);
  //         break;
  //       }
  //   }

  //  localStorage.setItem("matches",JSON.stringify(this.matches));
 this.matchService.deleteMatchById(x).subscribe((Response)=> {
 console.log("here response after delete",Response.message );
 this.matchService.getAllMatch().subscribe((data)=> {
  this.matches=data.matches;
  this.router.navigate(["admin"]);
})
 })

}  
 
}
