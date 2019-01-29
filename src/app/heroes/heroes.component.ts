import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
// You always import the Component symbol from the Angular core library and annotate the component class with @Component.
// @Component is a decorator function that specifies the Angular metadata for the component.
@Component({
  selector: 'app-heroes', // the component's CSS element selector,
  // matches the name of the HTML element that identifies this component within a parent component's template.
  templateUrl: './heroes.component.html', // the location of the component's template file
  styleUrls: ['./heroes.component.css'] // the location of the component's private CSS styles
})
export class HeroesComponent implements OnInit {
  // Always export the component class so you can import it elsewhere ... like in the AppModule
  // The ngOnInit is a lifecycle hook.
  // Angular calls ngOnInit shortly after creating a component. It's a good place to put initialization logic.
  // Use ngOnInit() for two main reasons:
  // To perform complex initializations shortly after construction.
  // To set up the component after Angular sets the input properties.

  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }// Constructors should do no more than set the initial local variables to simple values.
  // The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  // When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton
  // instance of HeroService.

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  // Observable.subscribe() is the critical difference.
  // The previous version assigns an array of heroes to the component's heroes property.
  // The assignment occurs synchronously, as if the server could return heroes instantly or
  // the browser could freeze the UI while it waited for the server's response.
  // That won't work when the HeroService is actually making requests of a remote server.
  // The new version waits for the Observable to emit the array of heroes— which could happen now or several minutes from now.
  // Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
  // This asynchronous approach will work when the HeroService requests heroes from the server.

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
