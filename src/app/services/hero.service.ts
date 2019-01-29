import { Injectable } from '@angular/core';

import { Hero } from '../models/hero';
import { HEROES } from '../models/mock-heroes';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

@Injectable() // The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
export class HeroService {
  // The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.
  // Removing data access from components means you can change your mind about the implementation anytime,
  // without touching any components. They don't know how the service works.

  constructor(private messageService: MessageService) { }
  // This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService
  // which is injected into the HeroesComponent.

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

}
