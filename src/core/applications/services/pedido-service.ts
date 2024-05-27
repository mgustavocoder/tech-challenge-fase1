import { Pagamento } from '../../domain/entities/pagamento'
import { Pedido } from '../../domain/entities/pedido'
import { type Item } from '../../domain/value-objects/item'
import { StatusPedido } from '../../domain/value-objects/status-pedido'
import { type IPedidoRepository } from '../ports/repositories/pedido-repository'
import { type PagamentoService } from './pagamento-service'

export class PedidoService {
  constructor (
    private readonly pagamentoService: PagamentoService,
    private readonly pedidosRepository: IPedidoRepository
  ) { }

  async getPedidos (): Promise<Pedido[]> {
    return await this.pedidosRepository.getPedidos()
  }

  async getPedidoById (id: string): Promise<Pedido> {
    return await this.pedidosRepository.getPedidoById(id)
  }

  async createPedido (pontoVendaId: number, cpf: string | undefined, itens: Item[]): Promise<Pedido> {
    const valor = Pagamento.calcularValor(itens)
    const pagamento = await this.pagamentoService.createPagamento(valor)
    const pedido = new Pedido(undefined, pontoVendaId, cpf, itens, pagamento)
    const pedidoId = await this.pedidosRepository.createPedido(pedido)
    pedido.id = pedidoId
    return pedido
  }

  async updatePedido (id: number, status: string): Promise<void> {
    await this.pedidosRepository.updatePedido(id, status)
  }

  async aprovarPedido (pagamentoId: number): Promise<void> {
    await this.pedidosRepository.updatePedidoWherePagamentoId(pagamentoId, StatusPedido.PAGAMENTO_APROVADO)
    await this.pagamentoService.aprovarPagamento(pagamentoId)
  }
}
