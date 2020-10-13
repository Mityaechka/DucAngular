export class ApiResult<T> {
  public isSuccess?: boolean;
  public errorMessage?: string;
  public result?: T;
  constructor() {}
}
