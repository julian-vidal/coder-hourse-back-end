const {normalize, schema, denormalize} = require("normalizr");
const fs = require("fs")

const data = require("./data/holding.json")

const employeeSchema = new schema.Entity("employees", {})
const companySchema = new schema.Entity("companies", {
    CEO: employeeSchema,
    manager: employeeSchema,
    employees: [employeeSchema]
})

const holdingSchema = new schema.Entity("holdings", {
    companies: [companySchema]
})

// Since the ID key for mongo is "_id", we need to:
// const holdingSchema = new schema.Entity("holdings", {
//     companies: [companySchema]
// }, {
//     idAttribute: "_id"
// })

const normalizedData = normalize(data, holdingSchema)

const fileName = "./data_normalized/holding.json"

try {
    fs.writeFileSync(fileName, JSON.stringify(normalizedData,null))
} catch (err) {
    console.log(err)
}