export class AcessoResponse {
  constructor (
    public token: string,
    public type: string = 'Bearer'
  ) {}
}
