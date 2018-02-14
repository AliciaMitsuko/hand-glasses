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
import {DataService} from "./services/data.service";
import {IconService} from "./services/icon.service";

import {DataTableModule} from "angular2-datatable";
import { TableComponent } from './admin/table/table.component';
import { MatListModule } from '@angular/material/list';
import {
  MatTableModule, MatSortModule, MAT_DATE_LOCALE, NativeDateAdapter, DateAdapter,
  MAT_DATE_FORMATS, MatNativeDateModule, MatToolbarModule, MatTabsModule, MatSlideToggleModule, MatMenuModule,
  MatCheckboxModule, MatDialogModule
} from '@angular/material';

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import {FilterPipe, SortByPipe} from './FilterPipe';
import { ChartComponent } from './admin/chart/chart.component'

const appRoutes: Routes = [
    { path: 'admin', component: AdminPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', component: HomePageComponent }
];

// const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
//   },
//   display: {
//     // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
//     dateInput: 'input',
//     monthYearLabel: {year: 'numeric', month: 'short'},
//     dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
//     monthYearA11yLabel: {year: 'numeric', month: 'long'},
//   }
// };

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    PageNotFoundComponent,
    MapPageComponent,
    ListPageComponent,
    HomePageComponent,
    TableComponent,
    FilterPipe,
    ChartComponent
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

    // charts
    ChartsModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,

    // MatCardModule,
    // MatSidenavModule,
    // MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,

    NgbModule.forRoot(),
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    TodoService,
    MapService,
    AccidentService,
    DataService,
    IconService,
    // {provide: DateAdapter, useClass: NativeDateAdapter},
    // {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
