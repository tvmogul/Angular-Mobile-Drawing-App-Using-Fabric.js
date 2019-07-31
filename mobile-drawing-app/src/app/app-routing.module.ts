import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SitePlanComponent } from './components/site-plan/site-plan.component';

const routes: Routes = [
  { path: '', component: SitePlanComponent },
  { path: 'siteplan', component: SitePlanComponent },
  { path: 'siteplan/:action', component: SitePlanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  SitePlanComponent
];
