const lista = [1,2,3,4,5];

lista
    .map(x => x+1)
    .forEach(x=> console.log(x))



const generateColor = () => {
    const red = Math.floor((Math.random()*256))
    const green = Math.floor((Math.random()*256))
    const blue = Math.floor((Math.random()*256))
    console.log(`color: rgb(${red}, ${blue}, ${green})`)
}