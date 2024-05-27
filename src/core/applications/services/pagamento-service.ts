import { Pagamento } from '../../domain/entities/pagamento'
import { StatusPagamento } from '../../domain/value-objects/status-pagamento'
import { type IGatewayPagamento } from '../ports/external/gateway-pagamento'
import { type IPagamentoRepository } from '../ports/repositories/pagamento-repository'

export class PagamentoService {
  constructor (
    private readonly pagamentoRepository: IPagamentoRepository,
    private readonly pagamentoGateway: IGatewayPagamento
  ) { }

  async createPagamento (valor: number): Promise<Pagamento> {
    const pagamento = new Pagamento(undefined, valor, StatusPagamento.AGUARDANDO_PAGAMENTO)
    const idPagamento = await this.pagamentoRepository.createPagamento(pagamento)
    pagamento.id = idPagamento
    pagamento.codigoCopiaCola = this.pagamentoGateway.getCodigoCopiaCola(idPagamento)
    return pagamento
  }

  async aprovarPagamento (id: number): Promise<void> {
    await this.pagamentoRepository.updatePagamento(id, StatusPagamento.PAGO)
  }
}
