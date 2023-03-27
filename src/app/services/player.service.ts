import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerurl: string = "http://localhost:3000/players"

  constructor(private httpClient: HttpClient) { }

  addPlayer(obj) {
    return this.httpClient.post<{ message: string }>(this.playerurl, obj);

  }

  editPlayer(newObj) {
    return this.httpClient.put(this.playerurl, newObj);
  }

  getAllPlayers() {
    return this.httpClient.get<{ players: any, message: string }>(this.playerurl);
  }
  getPlayerById(id) {
    console.log("here id", id);
    
    return this.httpClient.get<{ player: any, message: string }>(`${this.playerurl}/${id}`);
  }
  deletePlayer(id) {
    return this.httpClient.delete(`${this.playerurl}/${id}`);
  }
}
