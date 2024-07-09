import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { Book } from '../interfaces/book.interface';
import { environment } from '../../../environments/environment';
import { Filter } from '../interfaces/filter.interface';

@Injectable({ providedIn: 'root' })
export class BooksService {


  private baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient) { }


  getlibros():Observable<Book[]> {
    return this.http.get<Book[]>(`${ this.baseUrl }/libros`);
  }

  getBookById( id: string ): Observable<Book|undefined> {
    return this.http.get<Book>(`${ this.baseUrl }/libros/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getSuggestions( query: string ): Observable<Book[]> {
    return this.http.get<Book[]>(`${ this.baseUrl }/libros?q=${ query }&_limit=6`);
  }


  getGeneros(): Observable<string[]> {
    return this.getlibros().pipe(
      map((libros: Book[]) => {
        const generos = libros.map(libro => libro.genre);
        return Array.from(new Set(generos));
      })
    );
  }

  filterBooks(filters: Filter): Observable<Book[]> {
    let query = `${this.baseUrl}/libros?`;

    if (filters.genero) {
      query += `genre=${filters.genero}&`;
    }

    if (filters.name) {
      query += `q=${filters.name}&`;
    }

    if (filters.startDate && filters.endDate) {
      const startDate = filters.startDate.toISOString();
      const endDate = filters.endDate.toISOString();
      query += `published_gte=${startDate}&published_lte=${endDate}&`;
    }

    query = query.slice(0, -1);

    return this.http.get<Book[]>(query);
  }

  deleteBookById(id: string): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/libros/${ id }`)
    .pipe(
      map( resp => true ),
      catchError( err => of(false) ),
    );
  }

  addBook( Book: Book ): Observable<Book> {
    return this.http.post<Book>(`${ this.baseUrl }/libros`, Book );
  }

  updateBook( Book: Book ): Observable<Book> {
    if ( !Book.id ) throw Error('Book id is required');

    return this.http.patch<Book>(`${ this.baseUrl }/libros/${ Book.id }`, Book );
  }



}
