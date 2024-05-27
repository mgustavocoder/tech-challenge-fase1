import { type Pagamento } from '../../../domain/entities/pagamento'
import { type StatusPagamento } from '../../../domain/value-objects/status-pagamento'

export interface IPagamentoRepository {
  updatePagamento: (id: number, status: StatusPagamento) => Promise<any>
  createPagamento: (pagamento: Pagamento) => Promise<any>
}
