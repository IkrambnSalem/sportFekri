import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  editForm:FormGroup;
player:any={};
players:any=[];
id:any;
  constructor( private activatedRouter:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.players=JSON.parse(localStorage.getItem("players")||"[]");
  this.id=this.activatedRouter.snapshot.paramMap.get("id");
  for (let i = 0; i < this.players.length; i++) {
   if (this.players[i].id==this.id) {
    this.player= this.players[i];
    break;
   }
  }
  
  }

  editPlayer(){
    console.log("here the object of",this.player);
    
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id==this.id) {
       this.players[i]=this.player;
       break;
      }
     }
     localStorage.setItem("players",JSON.stringify(this.players));
     this.router.navigate(["admin"]);
  }


}
