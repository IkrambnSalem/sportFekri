import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminComponent } from './components/admin/admin.component';
import { AllmatchesComponent } from './components/allmatches/allmatches.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayersComponent } from './components/players/players.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { WeatherComponent } from './components/weather/weather.component';
import { EditMatchComponent } from './edit-match/edit-match.component';


const routes: Routes = [
  // http://localhost:4200 == home component will be displayed
{path:"",component:HomeComponent },
  // http://localhost:4200/signin == login component will be displayed
{path:"signin",component:LoginComponent},
{path:"signupAdmin",component:SignupComponent},
  // http://localhost:4200/subscription == signup component will be displayed
{path:"subscription",component:SignupComponent},
{path:"allmatches",component:AllmatchesComponent},
{path:"players", component:PlayersComponent},
{path:"add-match", component:AddMatchComponent},
{path:"add-player", component:AddPlayerComponent},
{path:"add-team", component:AddTeamComponent},
{path:"admin", component:AdminComponent},
// on ajoute 2 points pour rendre le id dynamique is a param
{path:"match-info/:id", component:MatchInfoComponent},
{path:"player-info/:id", component:PlayerInfoComponent},
{path:"edit-match/:id", component:EditMatchComponent},
{path:"team-info/:id", component:TeamInfoComponent},
{path:"edit-player/:id", component:EditPlayerComponent},
{path:"search", component:SearchComponent},
{path:"profile", component:ProfileComponent},
{path:"weather", component:WeatherComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
