
const firebase = require("firebase-admin");

const serviceAccount = require("./coderhouse-chat-entregable22-firebase-adminsdk-35zw0-1cf6e86f06.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

const db = firebase.firestore();
const messages = db.collection("messages");

const getAllMessages = async () => {
  try{
    const querySnapshot = await messages.get();
    const docs =  querySnapshot.docs;
    const result = docs.map(doc => {
      return doc.data()
    })

    return result
    // console.log(result)
  } catch(err) {
    console.log(err)
  }
}

getAllMessages()


module.exports = {
  getAllMessages
}