import { createLogger, format, transports } from 'winston'
const { combine, timestamp, printf } = format

const customFormat = printf(({ level, message, timestamp, error }) => {
  return `${timestamp} : ${level}: ${message}`
})

const logger = createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customFormat),
  transports: [new transports.Console()]
})

export default logger
