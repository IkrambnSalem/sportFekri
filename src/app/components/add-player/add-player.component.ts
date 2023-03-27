import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { generateId } from 'src/app/shared/genericFunction';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  player: any = {};
  playerForm: FormGroup;

  constructor(private router: Router,
    private playerService: PlayerService) { }

  ngOnInit() {
  }
  addPlayer() {
    this.playerService.addPlayer(this.player).subscribe( (response)=>{
     console.log("here RESPONSE from BE",response);
     
    })
     
    
    // console.log("here team object", this.player);
    // let playerTab = JSON.parse(localStorage.getItem("players") || "[]");
    // this.player.id = generateId(playerTab);
    // playerTab.push(this.player);
    // localStorage.setItem("players", JSON.stringify(playerTab));
    this.router.navigate(["admin"]);
  }
}
