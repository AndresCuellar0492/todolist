import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createFormat } from 'src/libs/utils/string/src';
import { ApiResult } from '../../core/entities/main-view.entity';
import { MovieParams } from '../../core/params/movie.params';
import { MainViewRepository } from '../../core/repositories/main-view.repository';
import { Operations } from '../constants/operations';

const BASE_URL = environment.baseUrl;
const API_KEY = environment.apiKey;

/* @Injectable({
  providedIn: 'root',
}) */
//@Injectable()
export class MfpMainViewRepository implements MainViewRepository {
  private http = inject(HttpClient);

  constructor() {}

  public get(params: MovieParams): Observable<ApiResult> {
    const URL = createFormat(Operations.GET_MOVIES, [
      params.page.toString(),
      API_KEY,
    ]);

    return this.http.get<ApiResult>(`${BASE_URL}${URL}`);
  }
  /*
  public get(): Promise<MovieResult> {
    throw new Error('Method not implemented.');
  } */

  /*  getTopRateMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`
    );
    //.pipe(delay(50000));
  }

  getMovieDetails(id: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
  } */
}
