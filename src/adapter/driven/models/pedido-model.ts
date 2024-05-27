import { type StatusPedido } from '../../../core/domain/value-objects/status-pedido'

export class PedidoModel {
  constructor (
    public readonly cliente_cpf: string | undefined,
    public readonly ponto_de_venda_id: number,
    public readonly pagamento_id: number | undefined,
    public readonly status: StatusPedido
  ) {}
}
