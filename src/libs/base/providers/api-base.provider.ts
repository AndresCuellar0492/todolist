export abstract class ApiBaseProvider {
  public abstract get<RQ, RS>(
    endpoint: string,
    params?: RQ,
    reqOpts?: any
  ): Promise<RS>;
  public abstract post<RQ, RS>(
    endpoint: string,
    body: RQ,
    reqOpts?: any
  ): Promise<RS>;

  public abstract put<RQ, RS>(
    endpoint: string,
    body: RQ,
    reqOpts?: any
  ): Promise<RS>;

  public abstract delete<RS>(endpoint: string, reqOpts?: any): Promise<RS>;
  public abstract patch<RS>(
    endpoint: string,
    body: any,
    reqOpts?: any
  ): Promise<RS>;
}
