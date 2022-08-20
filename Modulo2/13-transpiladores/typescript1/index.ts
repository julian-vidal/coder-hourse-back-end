const lista:Array<number> = [1,2,3,4,5];

lista.map((x:number) => x*x).forEach((x:number) => console.log(x));

const generateColor = function() : string {
    const red = Math.floor((Math.random()*256))
    const green = Math.floor((Math.random()*256))
    const blue = Math.floor((Math.random()*256))
    console.log(`color: rgb(${red}, ${blue}, ${green})`)

}