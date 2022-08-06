// Websocket client
const socket = io();

socket.on("connect", () => {
    console.log(`Connected to the server`) //console log en el cliente
})

socket.on("UPDATE_MESSAGES", allMessages => {
    // console.log("Welcome to the websocket") //console log en el cliente

    // Carga los mensajes anteriores
    document.getElementById("posts").innerHTML = "";
    // for (let msg of allMessages) {
    //     appendMessage(msg)
    // }
    allMessages
        .sort((a,b) => a.date - b.date)
        .map(msg => appendMessage(msg));
})

// Escucha cuando el server envia el socket "NEW_MESSAGE"
socket.on("NEW_MESSAGE", msg => {
    appendMessage(msg);
})

const appendMessage = msg => {
    document.getElementById("posts").innerHTML += `
        <div class="post ui card">
            <div class="content">
                <b>${msg.name} (${msg.socket_id}):</b> ${msg.message}
                <hr />
                <button onclick="likeMessage(${msg.id})">
                    <i class="heart icon"></i> ${msg.likes}
                </button>
            </div>
        </div>
    `
}

const enviarMsj = () => {
    const name = document.getElementById("name");
    const message = document.getElementById("message");

    socket.emit("POST_MESSAGE", {
        name:name.value,
        message: message.value
    })

    name.value="";
    message.value="";
}

const likeMessage = (msgID) => {
    socket.emit("LIKE_MESSAGE", msgID);
}