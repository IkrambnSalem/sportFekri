import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm : FormGroup;
 weatherResult : any;
  constructor( private formBuilder:FormBuilder , private router: Router , private weatherService:WeatherService) { }

  ngOnInit() {
   
    this.weatherForm = this.formBuilder.group({ 
      city:["",[Validators.required]]
    })
  }

  searchCity(){
  console.log("here the city", this.weatherForm.value);
  
  this.weatherService.searchCity(this.weatherForm.value).subscribe((dataFromAPI)=>{
console.log("here data from BE API",dataFromAPI.apiResult);
this.weatherResult=dataFromAPI.apiResult;

});
  }
}
