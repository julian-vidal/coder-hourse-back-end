const {normalize, schema, denormalize} = require("normalizr");
const fs = require("fs")

const data = require("./data/company.json")

const employeeSchema = new schema.Entity("employees", {})
const company = new schema.Entity("companies", {
    CEO: employeeSchema,
    manager: employeeSchema,
    employees: [employeeSchema]
})

const normalizedData = normalize(data, company)

const fileName = "./data_normalized/company.json"

try {
    fs.writeFileSync(fileName, JSON.stringify(normalizedData,null))
} catch (err) {
    console.log(err)
}