class Singleton{
    constructor (nombre) {
        this.nombre = nombre
    }

    static getSingleton() {
        if(!Singleton.instance){
            Singleton.instance = new Singleton("Carlos")
        }
        return Singleton.instance;
    }
}

const singleton1 = Singleton.getSingleton()
const singleton2 = Singleton.getSingleton()

console.log(singleton1 === singleton1)
console.log(singleton1.nombre)
console.log(singleton2.nombre)