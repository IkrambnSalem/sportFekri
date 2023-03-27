import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() X: any;
  @Output() newPlayers: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deletePlayer(id) {
    let players = JSON.parse(localStorage.getItem("players") || "[]");
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == id) {
        players.splice(i, 1)
        this.newPlayers.emit(players);
        break;
      }

    }
    localStorage.setItem("players", JSON.stringify(players));
  }

}
