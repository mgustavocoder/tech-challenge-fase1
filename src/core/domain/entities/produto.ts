import { type Categoria } from '../value-objects/categoria'

export class Produto {
  constructor (
    public nome: string,
    public descricao: string,
    public preco: number,
    public categoria: Categoria
  ) {}
}
