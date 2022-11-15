// const { default: mongoose } = require("mongoose");

const {Schema, model} = require("mongoose")


// const <schemaName> = new Schema ({
// <field>: {type: <type>, required: <boolean>}
// })
// 

const studentSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    dni: {type: String, required: true},
    course: {type: String, required: true},
    score: {type: Number, required: true},
}, {timestamps: true})


// const <modelName> = model("<collectionName>, <schemaName>")
const Student = model("student", studentSchema);

module.exports = {
    studentSchema,
    Student
}