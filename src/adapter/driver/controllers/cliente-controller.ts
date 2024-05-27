import { type Request, type Response } from 'express'
import { type ClienteService } from '../../../core/applications/services/cliente-service'
import { ClienteResponse } from '../dto/cliente-response'
import { CustomError } from '../dto/custom-error'

export class ClienteController {
  constructor (private readonly clienteService: ClienteService) { }

  async getClientes (req: Request, res: Response) {
    try {
      const clientes = await this.clienteService.getClientes()
      res.status(200).json(clientes.map(cliente => new ClienteResponse(
        cliente.nome,
        cliente.cpf,
        cliente.email
      )))
    } catch (error: any) {
      CustomError.handleControllerError(error, res)
    }
  }

  async getClienteByCpf (req: Request, res: Response) {
    try {
      const cliente = await this.clienteService.getClienteByCpf(req.params.cpf)
      res.status(200).json(new ClienteResponse(
        cliente.nome,
        cliente.cpf,
        cliente.email
      ))
    } catch (error: any) {
      CustomError.handleControllerError(error, res)
    }
  }
}
