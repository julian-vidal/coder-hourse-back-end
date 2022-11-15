const {normalize, schema, denormalize} = require("normalizr")
const fs = require("fs")

const data = require("./data/posts.json");

// console.log(data)

// First, we need to create the schemas

const author = new schema.Entity("authors", {});

// We only include non-primitive data
const comment = new schema.Entity("comments", {
    commenter: author
});


const post = new schema.Entity("posts", {
    author,
    comments: [comment]
})

// We only need to do a reference to the "parent" schema
const normalizedData = normalize(data, [post])


// write the file
const fileName = "./data_normalized/posts.json"
try {
    fs.writeFileSync(fileName, JSON.stringify(normalizedData, null))
} catch(err) {
    console.log(err)
}

const denormalizedData = denormalize(normalizedData.result, post, normalizedData.entities)

// try {
//     fs.writeFileSync("./data/denormalizedData.json", JSON.stringify(denormalizedData, null))
// } catch(err) {
//     console.log(err)
// }


console.log({
    // original: JSON.stringify(data).length / 1024,
    // normalized: JSON.stringify(normalizedData).length / 1024,
    // denormalize: JSON.stringify(denormalizedData).length / 1024
    denormalizedData: denormalizedData,
    typeDenormalizedData: typeof denormalizedData,
    typeNormalizedData: typeof normalizedData
})