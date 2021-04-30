import { DescriptionDialogComponent } from './components/create-user/description-dialog.component';
import { MaterialModule } from '../shared/material.module';
import { GamesFeedRoutingModule } from './movies-feed-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesFeedComponent } from './movies-feed.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApiPrefixInterceptor } from '@app/core/http/api-prefix.interceptor';

@NgModule({
  declarations: [MoviesFeedComponent, DescriptionDialogComponent],
  imports: [
    CommonModule,
    GamesFeedRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
  ],
})
export class GamesFeedModule {}
