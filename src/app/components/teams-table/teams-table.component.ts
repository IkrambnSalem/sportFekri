import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {

  teamtab: any = [];
  constructor(private router: Router, private teamService: TeamsService) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((data) => {
      this.teamtab = data.teams
    });
  }
  displayTeam(x: number) {
    this.router.navigate([`team-info/${x}`]);
  }

  editTeam(x: number) {
    alert("edit" + x);
  }
  deleteTeam(x: number) {
    this.teamService.deletebyId(x).subscribe((response) => {
      console.log("here response after delete", response.message);
      this.teamService.getAllTeams().subscribe((data) => {
        this.teamtab = data.teams
      });
    });
  }

}
