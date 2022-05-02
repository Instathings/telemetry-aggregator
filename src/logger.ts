import winston, {format} from "winston";


const {combine, colorize, cli, timestamp, json} = format

export const logger = winston.createLogger({
    format: combine(json(), timestamp()),
    level: process.env.LOG_LEVEL,
    levels: winston.config.cli.levels,
    transports: [
        new winston.transports.Console()
    ]
})