import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BooksRoutingModule } from './books-routing.module';
import { MaterialModule } from '../material/material.module';

import { CardComponent } from './components/card/card.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { FilterPageComponent } from './pages/filter-page/filter-page.component';
import { AdditionalFilterPageComponent } from './pages/additional-filter-page/additional-filter-page.component';
import { FilteredBooksPageComponent } from './pages/filtered-books-page/filtered-books-page.component';
import { BookDetailsModalComponent } from './components/book-details-modal/book-details-modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NewPageComponent } from './pages/new-page/new-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    FilterPageComponent,
    AdditionalFilterPageComponent,
    FilteredBooksPageComponent,
    BookDetailsModalComponent,
    CardComponent,
    ConfirmDialogComponent,
    NewPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    MaterialModule,
  ],
  providers:[
  ]
})
export class BooksModule { }
