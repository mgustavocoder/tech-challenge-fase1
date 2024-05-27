import express from 'express'
import { controllersFactory } from './factories/controllers-factory'
import { Logger } from '../driven/infra/logger'

const logger = new Logger()
const app = express()
app.use(express.json())

const { produtoController, pedidoController, clienteController, acessoController } = controllersFactory()

app.get('/api/produtos', async (req, res) => { await produtoController.getProdutos(req, res) })
app.get('/api/produtos/:id', async (req, res) => { await produtoController.getProdutoById(req, res) })
app.post('/api/produtos', async (req, res) => { await produtoController.createProduto(req, res) })
app.delete('/api/produtos/:id', async (req, res) => { await produtoController.deleteProduto(req, res) })

app.get('/api/lanches', async (req, res) => { await produtoController.getLanches(req, res) })
app.get('/api/lanches/:id', async (req, res) => { await produtoController.getLancheById(req, res) })
app.get('/api/acompanhamentos', async (req, res) => { await produtoController.getAcompanhamentos(req, res) })
app.get('/api/acompanhamentos/:id', async (req, res) => { await produtoController.getAcompanhamentoById(req, res) })
app.get('/api/bebidas', async (req, res) => { await produtoController.getBebidas(req, res) })
app.get('/api/bebidas/:id', async (req, res) => { await produtoController.getBebidaById(req, res) })
app.get('/api/sobremesas', async (req, res) => { await produtoController.getSobremesas(req, res) })
app.get('/api/sobremesas/:id', async (req, res) => { await produtoController.getSobremesaById(req, res) })

app.get('/api/pedidos', async (req, res) => { await pedidoController.getPedidos(req, res) })
app.get('/api/pedidos/:id', async (req, res) => { await pedidoController.getPedidoById(req, res) })
app.post('/api/pedidos', async (req, res) => { await pedidoController.createPedido(req, res) })
app.put('/api/pedidos/:id', async (req, res) => { await pedidoController.updatePedido(req, res) })

app.get('/api/clientes', async (req, res) => { await clienteController.getClientes(req, res) })
app.get('/api/clientes/:cpf', async (req, res) => { await clienteController.getClienteByCpf(req, res) })

app.post('/api/acessos/sign-in', async (req, res) => { await acessoController.signIn(req, res) })
app.post('/api/acessos/sign-up', async (req, res) => { await acessoController.signUp(req, res) })

app.post('/webhook/pagamentos/:id', async (req, res) => { await pedidoController.aprovarPedido(req, res) })

app.listen(3000, () => { logger.info('Server is listening on port 3000') })
