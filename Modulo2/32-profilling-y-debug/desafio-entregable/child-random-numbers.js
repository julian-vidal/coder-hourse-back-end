const calcRandom = totalNum => {
    const random = {}
    for(let i=0; i <totalNum; i++ ){
        let randomNumber = Math.floor(Math.random() * 1000) + 1
        if (random[randomNumber]) {
            random[randomNumber] += 1
        } else {
            random[randomNumber] = 1
        }
    }

    return random
}

process.on("message", totalNum => {
    process.send(calcRandom(totalNum))
})