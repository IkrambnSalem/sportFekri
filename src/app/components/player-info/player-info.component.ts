import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  player: any = {};
  id: any;
  constructor(private activatedRoute: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("here id", this.id);
    
    this.playerService.getPlayerById(this.id).subscribe((response) => {
      console.log("here response", response);
      
      console.log(response.player);

      this.player = response.player;
    })

  }

}
