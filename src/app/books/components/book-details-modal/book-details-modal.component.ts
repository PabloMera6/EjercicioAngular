import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: []
})
export class BookDetailsModalComponent {
  book: Book;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.book = data.book;
  }
}
