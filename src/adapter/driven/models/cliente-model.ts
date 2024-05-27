export class ClienteModel {
  constructor (
    public readonly cpf: string,
    public readonly nome: string,
    public readonly email: string,
    public readonly senha: string
  ) {}
}
