import { type Categoria } from './categoria'

export class Item {
  constructor (
    public nome: string,
    public descricao: string,
    public preco: number,
    public categoria: Categoria
  ) {}
}
