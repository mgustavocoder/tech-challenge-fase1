import Pino from 'pino'
import { type ILogger } from '../../../core/applications/ports/logger'

export class Logger implements ILogger {
  private readonly logger: any

  constructor () {
    this.logger = Pino({
      level: 'info',
      timestamp: false
    })
  }

  info (message: string): void {
    this.logger.info(message)
  }

  error (message: string): void {
    this.logger.error(message)
  }
}
