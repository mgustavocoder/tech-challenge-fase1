import { type Cliente } from '../../domain/entities/cliente'
import { type IClienteRepository } from '../ports/repositories/cliente-repository'

export class ClienteService {
  constructor (private readonly clienteRepository: IClienteRepository) { }

  async getClienteByCpf (cpf: string): Promise<Cliente> {
    return await this.clienteRepository.getClienteByCpf(cpf)
  }

  async getClientes (): Promise<Cliente[]> {
    return await this.clienteRepository.getClientes()
  }
}
