import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class apiService {
  private urlApi = "https://poetrydb.org" 

  constructor(private http: HttpClient) { }

  getData(): Observable<string[]> {
    return this.http.get<{ authors: string[] }>(`${this.urlApi}/author`).pipe(
      map(response => response.authors),
      catchError(this.handleError)
    );
  }

  getAuthor(author: string): Observable<any> {
    const encodedAuthor = encodeURIComponent(author); 
    const url = `${this.urlApi}/author/${encodedAuthor}/title`;  
    return this.http.get(url).pipe(
        catchError(this.handleError)
    );
  }

  getFragmentByTitle(title: string): Observable<any> {
    const encodedTitle = encodeURIComponent(title); 
    const url = `${this.urlApi}/title/${encodedTitle}`;  
    return this.http.get<any>(url).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud. Inténtalo de nuevo más tarde.'));
  }
}
