import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { UserService } from 'src/app/services/user.service';
import { generateId } from 'src/app/shared/genericFunction';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  teamForm: FormGroup;

  team: any = { team: " ", stadium: " ", owner: " ", foundation: " " };




  constructor(private router: Router, private teamService: TeamsService) { }

  ngOnInit() {
  }


  onSubmit(X: any) {


    console.log("here the object of", X);
    // let teamsTab=JSON.parse(localStorage.getItem("teams")||"[]");
    // // this.team.id=generateId(teamsTab);
    // teamsTab.push(this.team);
    // localStorage.setItem("teams",JSON.stringify(teamsTab));
    // if (data.valid) {
    // this.teamService.addTeam(this.team).subscribe((response) => {
    //   console.log("all is addded", response.message);

    // })
    // }

    // this.router.navigate(["admin"]);
  }
}