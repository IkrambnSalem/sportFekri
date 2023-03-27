import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  players:any=[];
  
  constructor( private router:Router,
    private playerService:PlayerService) { }

  ngOnInit() {
    this.playerService.getAllPlayers().subscribe((response)=>{
this.players=response.players;
    })
  }
  displayPlayer(x:number){
this.router.navigate([`player-info/${x}`])
   }
 
   editPlayer(x:number){
    this.router.navigate([`edit-player/${x}`]);
    }
    deletePlayer(x:number){
     alert("delete"+x);
    }
  
  

}
