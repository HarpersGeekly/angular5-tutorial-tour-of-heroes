import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './services/hero.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    NavbarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  // The providers array tells Angular to create a single, shared instance of HeroService and inject into any class that asks for it.
  providers: [
    HeroService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
