import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
    // This component is interested in the route's bag of parameters extracted from the URL.
    // The "id" parameter is the id of the hero to display.
    private heroService: HeroService,
    // The HeroService gets hero data from the remote server and this component will use it to get the hero-to-display
    private location: Location
    // The location is an Angular service for interacting with the browser.
  ) { }

  hero: Hero; // @Input() used for [hero] in heroes.component.html as: <app-hero-detail [hero]="selectedHero"></app-hero-detail>

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    // The route.snapshot is a static image of the route information shortly after the component was created.
    // The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
    // Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save() {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

}
