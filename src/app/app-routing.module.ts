import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_STRINGS } from './constants/constants';
import { HomePostPageComponent } from './home-post-page/home-post-page.component';

const routes: Routes = [
  { path: ROUTE_STRINGS.HOME, component: HomePostPageComponent },
  { path: '', redirectTo: ROUTE_STRINGS.HOME, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
