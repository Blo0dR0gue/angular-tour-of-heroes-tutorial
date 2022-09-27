import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes', //The component's element selector
  templateUrl: './heroes.component.html', //The location of the component's template file
  styleUrls: ['./heroes.component.css'] //The location of the component's private CSS styles
})
export class HeroesComponent implements OnInit {

  hero = 'Windstorm';

  constructor() { }

  //Lifecycle hook - Called after creating the component
  ngOnInit(): void {
  }

}
