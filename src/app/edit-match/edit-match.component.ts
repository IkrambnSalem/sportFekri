import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {
  matchForm:FormGroup;
 match:any={};
 matches:any=[];
id:any;
  constructor( private activatedRouter:ActivatedRoute,
               private router:Router, private matchService:MatchService) { }

               ngOnInit() {
                // Get id from path
                this.id = this.activatedRouter.snapshot.paramMap.get("id");
                this.matchService.getMatchById(this.id).subscribe(
                  (response)=>{
                    this.match=response.match;
                  }
                );
              }
              editMatch() {
                this.matchService.editMatch(this.match).subscribe(
                  (response)=>{
                    console.log("Here message :",response.message);
                    this.router.navigate(["admin"]);
                  }
                )
              }
            } 