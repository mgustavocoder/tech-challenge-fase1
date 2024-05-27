import { type Produto } from '../../../domain/entities/produto'
import { type Categoria } from '../../../domain/value-objects/categoria'

export interface IProdutoRepository {
  getProdutoById: (id: string, categoria: Categoria | undefined) => Promise<Produto>
  getProdutos: (categoria: Categoria | undefined) => Promise<Produto[]>
  createProduto: (produto: Produto) => Promise<number>
  deleteProduto: (id: string) => Promise<void>
}
