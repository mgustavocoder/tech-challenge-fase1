import { type Pagamento } from './pagamento'
import { StatusPedido } from '../value-objects/status-pedido'
import { type Item } from '../value-objects/item'

export class Pedido {
  constructor (
    public id: number | undefined,
    public pontoVendaId: number,
    public clienteCpf: string | undefined,
    public itens: Item[],
    public pagamento: Pagamento,
    public status: StatusPedido = StatusPedido.AGUARDANDO_PAGAMENTO
  ) {}
}
