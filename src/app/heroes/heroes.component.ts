import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes', //The component's element selector
  templateUrl: './heroes.component.html', //The location of the component's template file
  styleUrls: ['./heroes.component.css'] //The location of the component's private CSS styles
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;
  selectedHero?: Hero;

  constructor() { }

  //Lifecycle hook - Called after creating the component
  ngOnInit(): void {
  }

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
  }

}
