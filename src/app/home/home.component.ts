import { Component, OnInit } from '@angular/core';
import { LinechartData } from '../Services/linechart-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public projectDetails:LinechartData[]=[
    {year:2018, projects:23},
    {year:2019, projects:12},
    {year:2020, projects:31},
    {year:2021, projects:20},
    {year:2022, projects:28}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
