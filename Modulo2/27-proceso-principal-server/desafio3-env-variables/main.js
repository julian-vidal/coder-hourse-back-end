const {MODE} = process.env || "dev"
const {PORT} = process.env ?? 8080
const {DEBUG} = process.env || false


console.log({
    MODE,
    PORT,
    DEBUG
})