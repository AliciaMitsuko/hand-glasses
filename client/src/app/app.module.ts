import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapPageComponent } from './map-page/map-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { MapService } from './map.service';
import { AccidentService } from './services/accident.service';
import {DataTableModule} from "angular2-datatable";
import { TableComponent } from './admin/table/table.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule, MatSortModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import {FilterPipe, SortByPipe} from './FilterPipe'

const appRoutes: Routes = [
    { path: 'admin', component: AdminPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', component: HomePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    PageNotFoundComponent,
    MapPageComponent,
    ListPageComponent,
    HomePageComponent,
    TableComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    DataTableModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    TodoService,
    MapService,
    AccidentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
