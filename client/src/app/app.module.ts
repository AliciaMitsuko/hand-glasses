import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapPageComponent } from './map-page/map-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { AccidentService } from './services/accident.service';
import {DataService} from './services/data.service';
import {IconService} from './services/icon.service';
import {MapService} from './services/map.service';

/** Plug in **/
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from "./admin/modal/modal.component";
import { ModalContentComponent } from './admin/modal-content/modal-content.component';

import {DataTableModule} from "angular2-datatable";
import { TableComponent } from './admin/table/table.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import {FilterPipe, SortByPipe, VotePipe} from './FilterPipe';
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
    VotePipe,
    SortByPipe,
    ChartComponent,
    ModalComponent,
    ModalContentComponent,
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
    AngularFontAwesomeModule,
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
    MatProgressSpinnerModule,

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
  entryComponents: [
    ModalContentComponent
  ],
  providers: [
    TodoService,
    AccidentService,
    DataService,
    IconService,
    MapService,
    // {provide: DateAdapter, useClass: NativeDateAdapter},
    // {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
