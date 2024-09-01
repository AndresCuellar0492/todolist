import { UseCaseBase } from '@src/libs/features/commons';
import { MainViewRepository } from '@src/libs/features/main-view/src/core/repositories/main-view.repository';
import { Observable } from 'rxjs';
import { ApiResult } from '../entities/main-view.entity';
import { MovieParams } from '../params/movie.params';

export class GetUseCase
  implements UseCaseBase<MovieParams, Observable<ApiResult>>
{
  constructor(protected repository: MainViewRepository) {}

  public execute(params: MovieParams): Observable<ApiResult> {
    return this.repository.get(params);
  }
}
