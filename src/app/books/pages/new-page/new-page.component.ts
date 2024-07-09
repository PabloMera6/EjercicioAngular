import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Book } from '../../interfaces/book.interface';
import { BooksService } from '../../services/book.service';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public bookForm: FormGroup;

  public generos: string[] = [];

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {
    this.bookForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      published: [new Date(), [Validators.required, this.dateValidator]],
    });
  }

  get currentBook(): Book {
    const book = this.bookForm.value as Book;
    return book;
  }

  ngOnInit(): void {

    this.booksService.getGeneros().subscribe((generos: string[]) => {
      this.generos = generos;
    });

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.booksService.getBookById( id ) ),
      ).subscribe( book => {

        if ( !book ) {
          return this.router.navigateByUrl('/');
        }

        this.bookForm.reset( book );
        return;
      });

  }

  isValidField( field: string ): boolean | null {
    return this.bookForm.controls[field].errors
      && this.bookForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.bookForm.controls[field] ) return null;

    const errors = this.bookForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'dateInvalid':
          return `La fecha de publicación debe ser anterior a la actual`;
      }
    }

    return null;
  }

  dateValidator(control: FormControl) {
    const inputDate = new Date(control.value);
    const today = new Date();
    if (inputDate > today) {
      return { dateInvalid: true };
    }
    return null;
  }

  onSubmit():void {

    if ( this.bookForm.invalid ) return;

    if ( this.currentBook.id ) {
      this.booksService.updateBook( this.currentBook )
        .subscribe( book => {
          this.showSnackbar(`${ book.title } updated!`);
        });

      return;
    }

    this.booksService.addBook( this.currentBook )
      .subscribe( book => {
        this.router.navigate(['/books/edit', book.id ]);
        this.showSnackbar(`${ book.title } created!`);
      });
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }

}
