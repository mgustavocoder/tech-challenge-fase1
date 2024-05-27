import { type Response } from 'express'

export class CustomError {
  constructor (
    public statusCode: number,
    public message: string
  ) {}

  public static handleControllerError (error: any, res: Response) {
    if (error?.name === 'JsonWebTokenError' || error?.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Acesso negado.' })
      return
    }
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ ...error })
      return
    }
    res.status(500).json({ error: error.message })
  }
}
