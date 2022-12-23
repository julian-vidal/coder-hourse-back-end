import winston from "winston"

export const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.File({
            level: "warn",
            filename: "./logs/warn.log"
        }),
        new winston.transports.File({
            level: "error",
            filename: "./logs/error.log"
        }),
        new winston.transports.Console({level: "info"})
    ]
})