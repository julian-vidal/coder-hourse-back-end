const calc = () => {
    let counter = 0
    for(i=0; i< 1e9; i++) {
        counter += i
    }

    return counter
}


// Message del padre al hijo
process.on("message", msg => {
    console.log(`El padre manda: ${msg}`)
    const sum = calc()
    process.send(sum) // Comunication from the child to the parent
})