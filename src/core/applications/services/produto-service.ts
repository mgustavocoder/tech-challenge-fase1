import { type Produto } from '../../domain/entities/produto'
import { type Categoria } from '../../domain/value-objects/categoria'
import { type IProdutoRepository } from '../ports/repositories/produto-repository'

export class ProdutoService {
  constructor (private readonly produtoRepository: IProdutoRepository) { }

  async getProdutoById (id: string, categoria: Categoria | undefined): Promise<Produto> {
    return await this.produtoRepository.getProdutoById(id, categoria)
  }

  async getProdutos (categoria: Categoria | undefined): Promise<Produto[]> {
    return await this.produtoRepository.getProdutos(categoria)
  }

  async createProduto (produto: Produto): Promise<number> {
    return await this.produtoRepository.createProduto(produto)
  }

  async deleteProduto (id: string): Promise<void> {
    await this.produtoRepository.deleteProduto(id)
  }
}
