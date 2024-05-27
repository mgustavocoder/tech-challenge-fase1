import { type IPedidoRepository } from '../../../../core/applications/ports/repositories/pedido-repository'
import { type Pedido } from '../../../../core/domain/entities/pedido'
import { ItemModel } from '../../models/item-model'
import { PedidoModel } from '../../models/pedido-model'

export class PedidoRepository implements IPedidoRepository {
  constructor (private readonly queryBuilder: any) {}

  async getPedidoById (id: string): Promise<Pedido> {
    return this.queryBuilder
      .select('*')
      .from('pedidos')
      .where('id', id)
      .first()
  }

  async getPedidos (): Promise<Pedido[]> {
    return this.queryBuilder
      .select('*')
      .from('pedidos')
  }

  async createPedido (pedido: Pedido): Promise<number> {
    const pedidoRes = await this.queryBuilder
      .insert(new PedidoModel(pedido.clienteCpf, pedido.pontoVendaId, pedido.pagamento.id, pedido.status))
      .into('pedidos')
    const idPedido = pedidoRes[0]

    for await (const item of pedido.itens) {
      await this.queryBuilder
        .insert(new ItemModel(idPedido, item.nome, item.descricao, item.preco, item.categoria))
        .into('itens')
    }
    return idPedido
  }

  async updatePedido (id: number, status: string): Promise<void> {
    return this
      .queryBuilder('pedidos')
      .where('id', id)
      .update({ status })
  }

  async updatePedidoWherePagamentoId (id: number, status: string): Promise<void> {
    return this
      .queryBuilder('pedidos')
      .where('pagamento_id', id)
      .update({ status })
  }
}
