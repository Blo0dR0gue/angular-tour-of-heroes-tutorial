import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  //Value will be passed on component include
  //@Input() selectedHero?: Hero;
  selectedHero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService
      .getHero(id)
      .subscribe((hero) => (this.selectedHero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.selectedHero != undefined) {
      this.heroService
        .updateHero(this.selectedHero)
        .subscribe(() => this.goBack());
    }
  }

  deleteHero(): void {
    if (this.selectedHero != undefined) {
      this.heroService
        .deleteHero(this.selectedHero.id)
        .subscribe(() => this.goBack());
    }
  }
}
