import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  homepage: string;
  title: string;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}

   // getTopRateMovies(page: number = 1): Observable<ApiResult> {
  //   return this.http.get<ApiResult>(`${environment.baseUrl}/movie/top_rated?api_key=${environment.apiKey}&page=${page}`);
  // }

  getTopRateMovies(page: number = 1, language: string): Observable<ApiResult> {
    const url = `${environment.baseUrl}/movie/top_rated?api_key=${environment.apiKey}&page=${page}&language=${language}`;
    return this.http.get<ApiResult>(url);
  }
  
  getMovieDetails(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }
}
