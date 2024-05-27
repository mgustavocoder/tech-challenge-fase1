export class PedidoResponse {
  constructor (
    public id: number | undefined,
    public status: string,
    public valor: number,
    public codigoCopiaCola: string
  ) {}
}
