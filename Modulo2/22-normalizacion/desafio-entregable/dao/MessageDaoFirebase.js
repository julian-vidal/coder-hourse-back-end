const dotenv = require("dotenv")
const firebase = require("firebase-admin");

dotenv.config()

const serviceAccount = require("./coderhouse-chat-entregable22-firebase-adminsdk-35zw0-1cf6e86f06.json");

serviceAccount.private_key_id = process.env.private_key_id

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
      let message = doc.data();
      message.id = doc.id ;
      message.date = message.date.toDate()
      return message
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