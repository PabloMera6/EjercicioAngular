import { BooksService } from './../../services/book.service';
import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, switchMap, tap } from 'rxjs/operators';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';

@Component({
  selector: 'books-book-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input()
  public book!: Book;

  constructor(
    private BooksService: BooksService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog)
    {}


  ngOnInit(): void {
    if ( !this.book ) throw Error('book property is required');
  }

  openBookDetailsModal(book: Book): void {
    const element: Element | null = document.activeElement;
    if (element && (element.tagName === 'BUTTON' || element.tagName === 'MAT-BUTTON')) {
      return;
    }

    const dialogRef = this.dialog.open(BookDetailsModalComponent, {
      width: '500px',
      data: { book }
    });
  }

  onDeleteBook(): void {
    if (!this.book.id) throw new Error('Book id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.book
    });

    dialogRef.afterClosed()
      .pipe(
        filter((res: boolean) => res),
        switchMap(() => this.BooksService.deleteBookById(this.book.id)),
        tap(wasDeleted => {
          if (wasDeleted) {
            this.snackbar.open('Libro borrado', 'Close', {
              duration: 3000,
            });
          } else {
            this.snackbar.open('Fallo al borrar el libro', 'Close', {
              duration: 3000,
            });
          }
        })
      )
      .subscribe(() => {
        window.location.reload();
      });
  }
}
