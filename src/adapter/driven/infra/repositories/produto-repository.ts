import { type IProdutoRepository } from '../../../../core/applications/ports/repositories/produto-repository'
import { type Produto } from '../../../../core/domain/entities/produto'
import { type Categoria } from '../../../../core/domain/value-objects/categoria'
import { CustomError } from '../../../driver/dto/custom-error'

export class ProdutoRepository implements IProdutoRepository {
  constructor (private readonly queryBuilder: any) {}

  async getProdutoById (id: string, categoria: Categoria | undefined): Promise<Produto> {
    if (categoria) {
      return this.queryBuilder.select('*').from('produtos').where('id', id).andWhere('categoria', categoria)
    }
    return this.queryBuilder.select('*').from('produtos').where('id', id)
  }

  async getProdutos (categoria: Categoria | undefined): Promise<Produto[]> {
    if (categoria) {
      return this.queryBuilder.select('*').from('produtos').where('categoria', categoria)
    }
    return this.queryBuilder.select('*').from('produtos')
  }

  async createProduto (produto: Produto): Promise<number> {
    try {
      const response = await this.queryBuilder.insert(produto).into('produtos')
      return response[0]
    } catch (error: any) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new CustomError(400, 'Produto já cadastrado.')
      }
      throw error
    }
  }

  async deleteProduto (id: string): Promise<void> {
    this.queryBuilder.delete().from('produtos').where('id', id)
  }
}
