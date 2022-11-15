const { database } = require("firebase-admin");
const firebase = require("firebase-admin");
const serviceAccount = require("./test-backend-444d1-firebase-adminsdk-tqrze-2d15fda334.json")


firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://test-backend-444d1.firebaseio.com"
})

const db = firebase.firestore()
// console.log(db)
// console.log(Object.keys(db))

const user = db.collection("users")



// CREATE A NEW USER

const createUser = async (name, age) => {
    const doc = user.doc()

    const res = await doc.create({name, age})
    console.log(res)
}
// createUser("Jeniffer", 29)

// Read all
const readAll = async () => {
    const querySnapshot = await user.get();
    const docs = querySnapshot.docs;
    const result = docs.map(doc => {
        return {
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age
        }
    })
    console.log(result)
}
// readAll()


// Read by ID
const readByID = async id => {
    const doc = user.doc(`${id}`)
    const _user = await doc.get();
    const _data = _user.data();

    console.log({id,..._data})
}

readByID("Jlr0WZxN9VzHvD7geuRg")


// Update By ID

const updateByID = async (id, name, age) => {
    const doc = user.doc(id)
    const _user = await doc.update({age})
    console.log(_user)
}

// updateByID("Jlr0WZxN9VzHvD7geuRg", "" , 30)


const deleteByID = async id => {
    const doc = user.doc(id)
    const result = await doc.delete()
    console.log(result)
}

deleteByID("Jlr0WZxN9VzHvD7geuRg")