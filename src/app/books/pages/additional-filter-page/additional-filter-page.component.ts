import { Filter } from './../../interfaces/filter.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BooksService } from './../../services/book.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-additional-filter-page',
  templateUrl: './additional-filter-page.component.html',
  styles: []
})
export class AdditionalFilterPageComponent implements OnInit {
  @Output() filterChange = new EventEmitter<Filter>();

  public bookForm = new FormGroup({
    genero: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  public generos: string[] = [];

  constructor(
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.booksService.getGeneros().subscribe((generos: string[]) => {
      this.generos = generos;
    });

    if (this.filterChange.observers.length > 0) {
      this.emitFilterValues();
    }

    this.bookForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.emitFilterValues();
    });
  }


  emitFilterValues() {
    const filterValues: Filter = {
      name: '',
      genero: this.bookForm.value.genero || '',
      startDate: this.bookForm.value.startDate || null,
      endDate: this.bookForm.value.endDate || null,
    };
    this.filterChange.emit(filterValues);
  }

  resetForm() {
    this.bookForm.reset();
    this.emitFilterValues();
  }
}
