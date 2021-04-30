import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: 'games', pathMatch: 'full' },
    {
      path: 'games',
      loadChildren: () =>
        import('./movies-feed/movies-feed.module').then(
          (m) => m.GamesFeedModule,
        ),
    },
    { path: '**', redirectTo: '/games' },
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
