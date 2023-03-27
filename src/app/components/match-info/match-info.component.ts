import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {

  match: any = {};
  matches: any = [];
  id: any;
  constructor(private activatedRouter: ActivatedRoute, private matchService: MatchService) { }

  ngOnInit() {
    // get all matches
    // this.matches=JSON.parse(localStorage.getItem("matches")||"[]");

    //     // get ID value form actif path
    this.id = this.activatedRouter.snapshot.paramMap.get("id");
    //     // search object by ID
    //     for (let i = 0; i < this.matches.length; i++) {
    //  if (this.matches[i].id==this.id) {
    //        this.match=this.matches[i]
    //        break;
    //     }
    //   }
    this.matchService.getMatchById(this.id).subscribe((data) => {
      this.match = data.match;
    })
  }
}
