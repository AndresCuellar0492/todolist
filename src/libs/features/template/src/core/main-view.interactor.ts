import { MovieParams } from './params/movie.params';
import { MainViewRepository } from './repositories/main-view.repository';
import { GetUseCase } from './use-cases/get.use-case';

export class MainViewInteractor {
  protected getUseCase: GetUseCase;

  constructor(private mainViewRepository: MainViewRepository) {
    this.getUseCase = new GetUseCase(mainViewRepository);
  }

  public get(params: MovieParams) {
    // return this.getUseCase.execute(params);
           return this.mainViewRepository.get(params);
  }
}
