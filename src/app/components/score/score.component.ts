import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
// eventemitter impoort toujours de angular core et non autre 

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Input() X: any;
  @Output() newMatches:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  scoreColor(s1, s2) {
    if (s1 > s2) {
      return "green";
    } else if (s1 < s2) {
      return "brown";
    } else {
      return "blue";
    }

  }

  scoreTeam(s1, s2) {
    if (s1 > s2) {
      return 'win'
    } else if (s1 < s2) {
      return 'loss'
    } else {
      return 'draw'
    }

  }

  deleteMatch(id) {
    // get objects from localstorge matches
    let matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    for (let i = 0; i < matchesTab.length; i++) {
      if (matchesTab[i].id == id) {
        matchesTab.splice(i, 1);
// envoie de cet tableau au tableau parent par 
this.newMatches.emit(matchesTab);
        break;
      }

    }
    localStorage.setItem("matches", JSON.stringify(matchesTab));

  }

}
