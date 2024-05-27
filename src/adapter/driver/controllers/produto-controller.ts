import { type Request, type Response } from 'express'
import { type ProdutoService } from '../../../core/applications/services/produto-service'
import { Produto } from '../../../core/domain/entities/produto'
import { CustomError } from '../dto/custom-error'
import { Categoria } from '../../../core/domain/value-objects/categoria'

export class ProdutoController {
  constructor (private readonly produtoService: ProdutoService) { }

  async getProdutos (req: Request, res: Response) {
    try {
      const produtos = await this.produtoService.getProdutos(undefined)
      res.status(200).json(produtos)
    } catch (error: any) {
      CustomError.handleControllerError(error, res)
    }
  }

  async getProdutoById (req: Request, res: Response) {
    try {
      const Produto = await this.produtoService.getProdutoById(req.params.id, undefined)
      res.status(200).json(Produto)
    } catch (error: any) {
      CustomError.handleControllerError(error, res)
    }
  }

  async createProduto (req: Request, res: Response) {
    try {
      const { nome, preco, descricao, categoria } = req.body
      if (!Object.values(Categoria).some((value) => value === categoria)) {
        throw new CustomError(400, 'Categoria inválida.')
      }
      const id: number = await this.produtoService.createProduto(new Produto(nome, descricao, preco, categoria))
      res.status(200).json({ id })
    } catch (error: any) {
      CustomError.handleControllerError(error, res)
    }
  }

  async deleteProduto (req: Request, res: Response) {
    await this.produtoService.deleteProduto(req.params.id)
    res.status(200).json({})
  }

  async getLanches (req: Request, res: Response) {
    const produtos = await this.produtoService.getProdutos(Categoria.LANCHE)
    res.status(200).json(produtos)
  }

  async getLancheById (req: Request, res: Response) {
    const Produto = await this.produtoService.getProdutoById(req.params.id, Categoria.LANCHE)
    res.status(200).json(Produto)
  }

  async getAcompanhamentos (req: Request, res: Response) {
    const produtos = await this.produtoService.getProdutos(Categoria.ACOMPANHAMENTO)
    res.status(200).json(produtos)
  }

  async getAcompanhamentoById (req: Request, res: Response) {
    const Produto = await this.produtoService.getProdutoById(req.params.id, Categoria.ACOMPANHAMENTO)
    res.status(200).json(Produto)
  }

  async getBebidas (req: Request, res: Response) {
    const produtos = await this.produtoService.getProdutos(Categoria.BEBIDA)
    res.status(200).json(produtos)
  }

  async getBebidaById (req: Request, res: Response) {
    const Produto = await this.produtoService.getProdutoById(req.params.id, Categoria.BEBIDA)
    res.status(200).json(Produto)
  }

  async getSobremesas (req: Request, res: Response) {
    const produtos = await this.produtoService.getProdutos(Categoria.SOBREMESA)
    res.status(200).json(produtos)
  }

  async getSobremesaById (req: Request, res: Response) {
    const Produto = await this.produtoService.getProdutoById(req.params.id, Categoria.SOBREMESA)
    res.status(200).json(Produto)
  }
}
