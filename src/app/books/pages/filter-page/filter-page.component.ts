import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Book } from '../../interfaces/book.interface';
import { Filter } from './../../interfaces/filter.interface';
import { BooksService } from '../../services/book.service';
import { AdditionalFilterPageComponent } from '../additional-filter-page/additional-filter-page.component';

@Component({
  selector: 'app-Filter-page',
  templateUrl: './filter-page.component.html',
  styles: [
  ]
})
export class FilterPageComponent implements OnInit{
  @ViewChild(AdditionalFilterPageComponent) additionalFilterPage!: AdditionalFilterPageComponent;

  public FilterInput = new FormControl('');
  public Books: Book[] = [];
  public selectedBook?: Book;
  public showAdditionalFilters: boolean = false;
  public Filter: Filter= {
    genero: '',
    startDate: null,
    endDate: null,
    name: ''
  };

  constructor(
    private BooksService: BooksService,
  ) {}

  ngOnInit(): void {
    this.BooksService.getlibros().subscribe(books => {
      this.Books = books;
    });
  }

  toggleAdditionalFilters() {
    this.showAdditionalFilters = !this.showAdditionalFilters;
  }

  FilterBook() {
    const value: string = this.FilterInput.value || '';
    if(value.trim() !== ''){
      this.BooksService.getSuggestions( value )
      .subscribe( Books => this.Books = Books );
    }
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedBook = undefined;
      return;
    }

    const Book: Book = event.option.value;
    this.FilterInput.setValue( Book.title );

    this.selectedBook = Book;

  }

  applyFilter() {
    this.Filter.name = this.FilterInput.value || '';
    this.filterBooks();
  }

  resetFilter() {
    this.FilterInput.setValue('');
    this.Filter = {
      genero: '',
      startDate: null,
      endDate: null,
      name: ''
    };
    if (this.additionalFilterPage) {
      this.additionalFilterPage.resetForm();
    }

  }

  onFilterChange(filterValues: Filter) {
    this.Filter = { ...this.Filter, ...filterValues };
    this.FilterBook();
  }

  private filterBooks() {
    this.BooksService.filterBooks(this.Filter).subscribe(books => {
      this.Books = books;
    });
  }
}
