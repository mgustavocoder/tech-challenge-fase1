import { ProdutoController } from '.././controllers/produto-controller'
import { ProdutoService } from '../../../core/applications/services/produto-service'
import { PedidoController } from './../controllers/pedido-controller'
import { PedidoService } from '../../../core/applications/services/pedido-service'
import { ClienteService } from '../../../core/applications/services/cliente-service'
import { ClienteController } from './../controllers/cliente-controller'
import { AcessoController } from './../controllers/acesso-controller'
import { AcessoService } from '../../../core/applications/services/acesso-service'
import { PagamentoService } from '../../../core/applications/services/pagamento-service'
import { GatewayPagamento } from '../../driven/external/gateway-pagamento'
import { ProdutoRepository } from '../../driven/infra/repositories/produto-repository'
import { PedidoRepository } from '../../driven/infra/repositories/pedido-repository'
import { PagamentoRepository } from '../../driven/infra/repositories/pagamento-repository'
import { ClienteRepository } from '../../driven/infra/repositories/cliente-repository'
import { Logger } from '../../driven/infra/logger'
import { queryBuilderFactory } from '../../driven/infra/factories/query-builder-factory'

function controllersFactory () {
  const logger = new Logger()
  const queryBuilder = queryBuilderFactory()
  const produtoRepository = new ProdutoRepository(queryBuilder)
  const produtoService = new ProdutoService(produtoRepository)
  const produtoController = new ProdutoController(produtoService)
  const pedidoRepository = new PedidoRepository(queryBuilder)
  const pagamentoRepository = new PagamentoRepository(queryBuilder)
  const pagamentoGateway = new GatewayPagamento(logger)
  const pagamentoService = new PagamentoService(pagamentoRepository, pagamentoGateway)
  const pedidoService = new PedidoService(pagamentoService, pedidoRepository)
  const pedidoController = new PedidoController(pedidoService)
  const clienteRepository = new ClienteRepository(queryBuilder)
  const clienteService = new ClienteService(clienteRepository)
  const clienteController = new ClienteController(clienteService)
  const acessoService = new AcessoService(clienteRepository)
  const acessoController = new AcessoController(acessoService)
  return { produtoController, pedidoController, clienteController, acessoController }
}

export { controllersFactory }
