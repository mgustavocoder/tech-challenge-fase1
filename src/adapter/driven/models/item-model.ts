export class ItemModel {
  constructor (
    public readonly pedido_id: number,
    public readonly nome: string,
    public readonly descricao: string,
    public readonly preco: number,
    public readonly categoria: string
  ) {}
}
