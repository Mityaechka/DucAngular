export class ApiResult<T>{
  constructor(public isSuccess?: boolean, public errorMessage?: string, public result?: T) {

  }
}
