const socket = io();

socket.on("connect", () => {
    console.log("Connected to the server")
})

socket.on("UPDATE_MESSAGES", allMessages => {
    document.getElementById("chat").innerHTML = "";
    allMessages.map(msg => appendMessage(msg))
})


socket.on("NEW_MESSAGE", msg => {
    appendMessage(msg)
})


const appendMessage = msg => {

    let {email,date,message} = msg;

    date = new Date(date).toLocaleString();

    document.getElementById("chat").innerHTML += `
        <div>
        <b>[${date}] ${email}:</b> ${message} 
        </div>
    `

    
}

const sendMessage = () => {
    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    socket.emit("POST_MESSAGE", {
        email,
        message: message.value
    })

    message.value="";
}