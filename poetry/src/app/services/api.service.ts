import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class apiService {
    private urlApi = "https://poetrydb.org/author"


  constructor(private http: HttpClient) { }

  getData(): Observable<string[]> {
    return this.http.get<{ authors: string[] }>(this.urlApi).pipe(
      map(response => response.authors),
      catchError(this.handleError) 
    );
  }

  getAuthor(author: string): Observable<any> {
    const encodedAuthor = encodeURIComponent(author); // Codificar el nombre del autor
    const url = `https://poetrydb.org/author/${encodedAuthor}/title`;
    return this.http.get(url).pipe(
        catchError(this.handleError)
    );
}

  getFragment(author: string): Observable<any> {
    const url = `${this.urlApi}/${author}`;
    return this.http.get<any>(url).pipe(
        catchError(this.handleError) 
    );
}

  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);

    return throwError(() => new Error('Error en la solicitud. Inténtalo de nuevo más tarde.'));
  }
}
