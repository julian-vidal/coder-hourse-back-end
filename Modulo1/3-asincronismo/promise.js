const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        divisor === 0 ? reject("No se puede dividor por cero") : resolve(dividendo/divisor)
    })
}

dividir(12,2)
    .then(
        resultado => console.log(`La división es ${resultado}`)
    )
    .catch(
        error => console.error(`Error: ${error}`)
    );