import { type Cliente } from '../../../domain/entities/cliente'

export interface IClienteRepository {
  getClienteByCpf: (cpf: string) => Promise<Cliente>
  getClienteByEmail: (email: string) => Promise<Cliente>
  getClientes: () => Promise<Cliente[]>
  createCliente: (pedido: Cliente) => Promise<void>
}
