import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Routes tell the router which view to display when a user clicks a link or pastes a URL into the browser address bar.
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // default path
  { path: 'heroes', component: HeroesComponent }, // the router will match that URL to path: 'heroes' and display the HeroesComponent.
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ], // You first must initialize the router and start it listening for browser location changes.
  // The method is called forRoot() because you configure the router at the application's root level.
  // The forRoot() method supplies the service providers and directives needed for routing,
  // and performs the initial navigation based on the current browser URL.

})
export class AppRoutingModule {}


