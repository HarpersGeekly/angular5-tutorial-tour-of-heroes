import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Hero } from '../models/hero';
import { HEROES } from '../models/mock-heroes'; // no longer needed
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable() // The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
export class HeroService {
  // The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.
  // Removing data access from components means you can change your mind about the implementation anytime,
  // without touching any components. They don't know how the service works.

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  // This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService
  // which is injected into the HeroesComponent.

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES); // used RxJS of() to return an Observable of mock heroes (Observable<Hero[]>).
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe( // **pipe**
        tap(heroes => this.log(`fetched heroes`)), // **tap**
        catchError(this.handleError('getHeroes', [])) // **catchError**, **handleError**
      );
    // You've swapped of(HEROES) for http.get and the app keeps working without any other changes
    // because both functions return an Observable<Hero[]>.

    // All HttpClient methods return an RxJS Observable of something.

    // HTTP is a request/response protocol. You make a request, it returns a single response.

    // In general, an Observable can return multiple values over time.
    // An Observable from HttpClient always emits a single value and then completes, never to emit again.

    // This particular HttpClient.get call returns an Observable<Hero[]>, literally "an observable of hero arrays".
    // In practice, it will only return a single hero array.

    // HttpClient.get returns response data
    // HttpClient.get returns the body of the response as an untyped JSON object by default.
    // Applying the optional type specifier, <Hero[]> , gives you a typed result object.

    // The shape of the JSON data is determined by the server's data API. The Tour of Heroes data API returns the hero data as an array.

    // Other APIs may bury the data that you want within an object.
    // You might have to dig that data out by processing the Observable result with the RxJS map operator.

    // **pipe**
    // To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator.
    // **tap**
    // The HeroService methods will tap into the flow of observable values and send a message (via log())
    // to the message area at the bottom of the page.
    // They'll do that with the RxJS tap operator, which looks at the observable values,
    // does something with those values, and passes them along. The tap call back doesn't touch the values themselves.
    // **catchError**
    // The catchError() operator intercepts an Observable that failed.
    // It passes the error an error handler that can do what it wants with the error.
    // **handleError()**
    // The following handleError() method reports the error and then returns an innocuous result so that the application keeps working.
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  // There are three significant differences from getHeroes().
  // it constructs a request URL with the desired hero's id.
  // the server should respond with a single hero rather than an array of heroes.
  // therefore, getHero returns an Observable<Hero> ("an observable of Hero objects") rather than an observable of hero arrays .

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // After reporting the error to console, the handler constructs a user friendly message
  // and returns a safe value to the app so it can keep working.
  // Because each service method returns a different kind of Observable result,
  // errorHandler() takes a type parameter so it can return the safe value as the type that the app expects.

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
