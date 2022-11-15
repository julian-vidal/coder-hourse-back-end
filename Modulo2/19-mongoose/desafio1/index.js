// const mongoose = require("mongoose");
// const { connection } = require("mongoose");
const Connection = require("./database")
const {Student} = require("./schema");
const dbConnection = require("./database")

dbConnection()



// CREATE

const createStudents = async () => {
    try {
        const response = await Student.insertMany([
            { firstName: 'Pedro', lastName: 'Mei', age: 21, dni: '31155898', course: '1A', score: 7 },
            { firstName: 'Ana', lastName: 'Gonzalez', age: 32, dni: '27651878', course: '1A', score: 8 },
            { firstName: 'José', lastName: 'Picos', age: 29, dni: '34554398', course: '2A', score: 6 },
            { firstName: 'Lucas', lastName: 'Blanco', age: 22, dni: '30355874', course: '3A', score: 10 },
            { firstName: 'María', lastName: 'García', age: 36, dni: '29575148', course: '1A', score: 9 },
            { firstName: 'Federico', lastName: 'Perez', age: 41, dni: '320118321', course: '2A', score: 5 },
            { firstName: 'Tomas', lastName: 'Sierra', age: 19, dni: '38654790', course: '2B', score: 4 },
            { firstName: 'Carlos', lastName: 'Fernández', age: 33, dni: '26935670', course: '3B', score: 2 },
            { firstName: 'Fabio', lastName: 'Pieres', age: 39, dni: '4315388', course: '1B', score: 9 },
            { firstName: 'Daniel', lastName: 'Gallo', age: 25, dni: '37923460', course: '3B', score: 2 }
        ])
    } catch(err) {
        console.log(err)
    }

}


createStudents()


//READ
const readStudents = async () => {
    try {
        const students = await Student.find();
        console.log(students)
    } catch (err) {
        console.log(err)
    }
}
// readStudents()

const alfabetico = async () => {
    try {
        const students = await Student.find({}).sort({firstName: 1});
        console.log(students)
    } catch (err) {
        console.log(err)
    }
}
// alfabetico()


const masJoven = async () => {
    try{
        const res = await Student.find({}).sort({age: 1}).limit(1)
        console.log(res)
    } catch(err) {
        console.log(err)
    }
}
// masJoven()


const segundoMasJoven = async () => {
    try{
        const res = await Student.find({}).sort({age: 1}).limit(1).skip(1)
        console.log(res)
    } catch(err) {
        console.log(err)
    }
}
// segundoMasJoven()


const curso2A = async () => {
    try {
        const res = await Student.find({course: "2A"})
        console.log(res)
    } catch (err){
        console.log(err)
    }
}
// curso2A()


const nombreYApellido = async () => {
    try {
        const res = await Student.find({}, {firstName: 1, lastName:1, course:1}).sort({lastName: -1})
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

// nombreYApellido()


// UPDATE
const updateStudent = async () => {

    try {
        const result = await Student.updateOne({
            firstName: "Fabio", lastName: "Pieres" //It's case sensitive
        }, {
            $set: {"dni": "111111"}
        })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

// updateStudent();


// DELETE

const deleteStudent = async () => {
    try {
        const result = await Student.deleteOne({
            firstName: "Fabio", lastName: "Pieres"
        })
        console.log(result)
    } catch(err) {
        console.log(err)
    }
}

// deleteStudent()

// break
// final
