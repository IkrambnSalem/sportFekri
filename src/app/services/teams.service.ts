import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
teamUrl:string="http://localhost:3000/teams"
  constructor(private httpClient:HttpClient) { }

  addTeam(obj){
    return this.httpClient.post<{message:string}>(this.teamUrl,obj);
  }

  getAllTeams(){
    return this.httpClient.get<{teams:any}>(this.teamUrl);
  }

  deletebyId(id){
    return this.httpClient.delete<{message:string}>(`${this.teamUrl}/${id}`);
  }

  getTeamById(id){
    return this.httpClient.get<{team:any}>(`${this.teamUrl}/${id}`);
  }
}
