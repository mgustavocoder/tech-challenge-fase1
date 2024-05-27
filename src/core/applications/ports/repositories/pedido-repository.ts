import { type Pedido } from '../../../domain/entities/pedido'

export interface IPedidoRepository {
  getPedidoById: (id: string) => Promise<Pedido>
  getPedidos: () => Promise<Pedido[]>
  createPedido: (pedido: Pedido) => Promise<number>
  updatePedido: (id: number, status: string) => Promise<void>
  updatePedidoWherePagamentoId: (id: number, status: string) => Promise<void>
}
