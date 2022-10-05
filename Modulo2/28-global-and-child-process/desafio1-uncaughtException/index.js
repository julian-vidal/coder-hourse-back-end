const processName = process.argv[1]
const args = process.argv.slice(2)

// This will run when there's an uncaught exception. Eg: executing a function that doesn't exist
process.on("uncaughtException", err => {
    console.log({
        error: err.message,
        numbers,
        description: "This is triggered by the uncaughtException"
    })
})

// Takes the numbers in the put and turn those into integers
const numbers = args.map(number => parseInt(number))

// Calculations
const average = numbers.reduce((a,b) => parseInt(a) + parseInt(b)) / numbers.length
const sum = numbers.reduce((a,b) => parseInt(a) + parseInt(b))
const min = Math.min(...numbers)
const max = Math.max(...numbers)


const types = numbers.map(number => typeof number)
const invalidTypes = numbers.filter(n => isNaN(n))

if (invalidTypes.length > 0) {
    throw new Error("Inavlid type provided in arguments")
}

console.log({
    numbers,
    average,
    sum,
    min,
    max,
    processName,
    pid: process.pid
})


