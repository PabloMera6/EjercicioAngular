import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filtered-books-page',
  templateUrl: './filtered-books-page.component.html',
  styleUrls: []
})
export class FilteredBooksPageComponent {
  @Input() filteredBooks: Book[] = [];

  constructor(private dialog: MatDialog
  ) {}

}
