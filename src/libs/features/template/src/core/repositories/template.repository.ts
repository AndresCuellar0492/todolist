import { Observable } from 'rxjs';
import { ApiResult } from '../entities/main-view.entity';
import { MovieParams } from '../params/movie.params';

export abstract class TemplateRepository {
  public abstract get(params: MovieParams): Observable<ApiResult>;
}
