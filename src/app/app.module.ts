import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { DetailCellRenderer } from './detail-cell-renderer';
import { BooleanCellRenderer } from './boolean-cell-renderer';
import { FavoriteCellRenderer } from './favorite-cell-renderer';

import { AgGridModule } from 'ag-grid-angular';
// import 'ag-grid-enterprise'; // enable if you want enterprise features. for development and learning purposes only

@NgModule({
  declarations: [
    AppComponent,
    DetailCellRenderer,
    BooleanCellRenderer,
    FavoriteCellRenderer,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    AgGridModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasHeart, faHeart, faCheck);
  }
}
