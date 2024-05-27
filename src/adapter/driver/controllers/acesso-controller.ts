import jwt, { type JwtPayload } from 'jsonwebtoken'
import { type Request, type Response } from 'express'
import { Cliente } from '../../../core/domain/entities/cliente'
import { type AcessoService } from '../../../core/applications/services/acesso-service'
import { CustomError } from '../dto/custom-error'
import { AcessoResponse } from '../dto/acesso-response'
import { JWT_SECRET_KEY } from '../../config/constants'

export class AcessoController {
  constructor (private readonly acessoService: AcessoService) { }

  async signIn (req: Request, res: Response) {
    try {
      const { email, senha } = req.body
      const token = await this.acessoService.signIn(email, senha)
      res.status(200).json(new AcessoResponse(token))
    } catch (error) {
      CustomError.handleControllerError(error, res)
    }
  }

  async signUp (req: Request, res: Response) {
    try {
      const { nome, email, cpf, senha } = req.body
      const cliente = new Cliente(nome, cpf, email, senha)
      const token = await this.acessoService.signUp(cliente)
      res.status(200).json(new AcessoResponse(token))
    } catch (error) {
      CustomError.handleControllerError(error, res)
    }
  }

  static async authenticate (req: Request, options: any): Promise<Cliente | undefined> {
    if (options?.optional) {
      if (!req.headers.authorization) {
        return undefined
      }
    }

    let { authorization } = req.headers
    authorization = authorization?.toString().substring(7)
    const cliente = jwt.verify(authorization?.toString() ?? '', JWT_SECRET_KEY) as JwtPayload
    if (authorization === null || authorization === undefined || authorization === '') {
      throw new CustomError(401, 'Acesso negado.')
    }
    return new Cliente(cliente.nome, cliente.cpf, cliente.email, cliente.senha)
  }
}
