// the component class code, written in TypeScript.
// Components are the fundamental building blocks of Angular applications.
// They display data on the screen, listen for user input, and take action based on that input.

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
