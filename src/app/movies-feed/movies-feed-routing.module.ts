import { MoviesFeedComponent } from './movies-feed.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'top', pathMatch: 'full' },
  { path: ':gameType', component: MoviesFeedComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesFeedRoutingModule {}
