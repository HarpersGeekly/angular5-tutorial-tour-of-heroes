import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;

  private searchTerms = new Subject<string>(); // The searchTerms property is declared as an RxJS Subject.
  // A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
  // You can also push values into that Observable by calling its next(value) method as the search() method does.
  // The search() method is called via an event binding to the textbox's keystroke event.

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string) {
    this.searchTerms.next(term);
  }

  // Passing a new search term directly to the searchHeroes() after every user keystroke would create an excessive amount of HTTP requests,
  // taxing server resources and burning through the cellular network data plan.
  // Instead, the ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators
  // that reduce the number of calls to the searchHeroes(),
  // ultimately returning an observable of timely hero search results (each a Hero[]).
  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(

      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term, ensures that a request is sent only if the filter text changed.
      distinctUntilChanged(),

      // switch to new search observable each time the term changes, calls the search service for
      // each search term that makes it through debounce and distinctUntilChanged.
      // It cancels and discards previous search observables, returning only the latest search service observable.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
