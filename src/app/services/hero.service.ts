import { Injectable } from '@angular/core';

import { Hero } from '../models/hero';
import { HEROES } from '../models/mock-heroes';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable() // The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
export class HeroService {
  // The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.
  // Removing data access from components means you can change your mind about the implementation anytime,
  // without touching any components. They don't know how the service works.

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }

}
