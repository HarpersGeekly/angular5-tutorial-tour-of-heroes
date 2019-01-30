import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = []; // declares an array called heroes of type Hero (need to import Hero model)

  constructor(private heroService: HeroService) { } // dependency injection

  ngOnInit() {
    this.getHeroes(); // calls the getHeroes() method in this file, which calls from HeroService (need the import and injection too)
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5)); // reduces the number of heroes displayed to four (2nd, 3rd, 4th, and 5th).
  }

}
