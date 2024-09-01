import { Observable } from 'rxjs';

export interface UseCaseBase<Request, Response> {
  execute(params: Request): Promise<Response> | Response | Observable<Response>;
  execute(
    ...params: unknown[]
  ): Promise<Response> | Response | Observable<Response>;
}
