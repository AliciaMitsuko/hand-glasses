import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapPageComponent } from './map-page/map-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { MapService } from './map.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

const appRoutes: Routes = [
    { path: 'admin-edit', component: AdminEditComponent },
    { path: 'home',      component: HomePageComponent },
    { path: '**', component: HomePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminEditComponent,
    PageNotFoundComponent,
    MapPageComponent,
    ListPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    TodoService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
