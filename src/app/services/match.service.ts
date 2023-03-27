import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
  // 1-declarer un httpClient ds le constructor + 2-declarer l'adresse de destination /3-declarer les methodes de services 
})
export class MatchService {
  // adresse de service de backend 
  matchUrl: string = "http://localhost:3000/matches"

  constructor(private httpClient: HttpClient) { }
  // request to add Match
  // reponse:message
  addMatch(obj) {
    return this.httpClient.post<{ message: string, isAdded: boolean }>(this.matchUrl, obj);
  }
  // request to get all Matches
  // reponse :[{},{}...]
  getAllMatch() {
    return this.httpClient.get<{ matches: any, message: string }>(this.matchUrl);
  }
  // request to get match by id 
  // reponse :{}
  getMatchById(id) {
    return this.httpClient.get<{ match: any }>(`${this.matchUrl}/${id}`);
  }
  // request to delete match By ID
  // reponse : message 
  deleteMatchById(id) {
    return this.httpClient.delete <{message:string}>(`${this.matchUrl}/${id}`);
  }

  // request to update match by id 
  // reponse :message 
  editMatch(newObj) {
    return this.httpClient.put<{message:string}>(this.matchUrl, newObj);
  }

  searchMatch(obj) {
    return this.httpClient.post<{ matches: any }>(this.matchUrl, obj);
  }

}
