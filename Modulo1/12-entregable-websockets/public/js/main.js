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
    document.getElementById("chat").innerHTML += `
        <div>
            [${msg.date}] ${msg.email}: ${msg.message} 
        </div>
    `
}

const sendMessage = () => {
    const name = document.getElementById("name");
    const message = document.getElementById("message").value;

    socket.emit("POST_MESSAGE", {
        name: name.value,
        message
    })

    name.value="";
}