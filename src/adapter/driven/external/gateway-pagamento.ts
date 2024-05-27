import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { type IGatewayPagamento } from '../../../core/applications/ports/external/gateway-pagamento'
import { type ILogger } from '../../../core/applications/ports/logger'

export class GatewayPagamento implements IGatewayPagamento {
  constructor (private readonly logger: ILogger) {}
  getCodigoCopiaCola (idPagamento: number): string {
    // FAKE - Simula a aprovação do pagamento
    setTimeout(async (idPagamento: number) => {
      const options = {
        method: 'POST',
        url: `http://localhost:3000/webhook/pagamentos/${idPagamento}`,
        headers: {
          cookie: 'JSESSIONID=90ED2EA964471F20F03954DE12951B0B',
          'Content-Type': 'application/json'
        },
        data: { status: 'PAGO' }
      }
      await axios.request(options).catch((error: any) => {
        this.logger.error(error)
      })
      this.logger.info(`Pedido pago, aprovar via webhook. ${idPagamento}`)
    }, 15000, idPagamento)
    return uuidv4()
  }
}
